import 'dotenv/config'
import express from 'express';
import todoSchema from './MongoDB.js'
import userSchemea from './UsersDB.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import MongoStore from 'connect-mongo'

const app = express();

// const connectToDB =  async() => {
//     // mongoose.connect("mongodb://localhost/todoDB")
//     try {
//         await mongoose.connect(
//             process.env.MONGO_DB_ATLAS_URI,
//             () => console.log("Mongoose is connected")
//         )
//     } catch (e) {
//         console.log(e)
//     }
// }

// connectToDB()

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Mongo db is connected successfully..')
})

const MongoDB = new mongoose.model("todo", todoSchema)

app.use(cors({
    origin: "https://pravin-todo-app.netlify.app",
    credentials: true
}))

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://pravin-todo-app.netlify.app"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Credentials', 'true')
//     next();
// });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1);
app.use(session({
    cookie: {
        secure: true,
        maxAge: 60000,
        httpOnly: false, 
    },
    secret: "mytodoapp",
    store: MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    }),
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.authenticate('session'))
app.use(passport.session())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'))
}


const User = new mongoose.model("user", userSchemea)

passport.use(new LocalStrategy(User.authenticate()))
// passport.use(User.createStrategy())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://pravintodoapp.herokuapp.com/auth/google/todo",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    username: profile.emails[0].value,
                    provider: 'google',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    googleId: profile.id
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
));

// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

passport.serializeUser(function (user, done) {
    console.log('trying to serialise ', user)
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('trying to deserialise ', user)
    done(null, user);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ["email", "profile"], prompt: ['select_account'] })
)

// app.get('/auth/google',(req,res)=> {
//     passport.authenticate('google',{ scope:["profile"] })
//     res.send(200)
// })


app.get('/auth/google/todo',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // res.sendStatus(200)
        res.redirect('https://pravin-todo-app.netlify.app')
    }
)

app.post('/register', (req, res) => {
    User.register(
        { username: req.body.username },
        req.body.password,
        (err, user) => {
            if (err) {
                res.sendStatus(409)
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.sendStatus(201)
                })
            }
        }
    )
})

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, (err) => {
        if (err) {
            console.log(err)
            res.sendStatus(400)
        } else {
            passport.authenticate("local")(req, res, () => {
                console.log('inside login ', req.isAuthenticated())
                // req.session.logg
                res.sendStatus(200)
            })
        }
    })
})

app.get('/auth', (req, res) => {
    console.log("inside auth get ", req.isAuthenticated())
    if (req.isAuthenticated()) {
        res.send(true)
    } else {
        res.send(false)
    }
})

app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(204)
})

app.get('/', (req, res) => {
    console.log("inside / get ", req.isAuthenticated())
    if (req.isAuthenticated()) {
        // console.log(req.user)
        User.findById(req.user._id, (err, user) => {
            if (err) {
                res.sendStatus(400)
            } else {
                res.send(user.todo)
            }
        })
    } else {
        res.sendStatus(401)
    }
})

app.delete('/todo/:id', (req, res) => {
    const id = req.params.id
    User.updateOne(
        { _id: req.user._id },
        {
            $pull: {
                todo: { _id: id }
            },
        },
        (err) => {
            if (err) {
                res.sendStatus(503)
            } else {
                res.send(204)
            }
        }
    )
})

app.put('/todo/:id', (req, res) => {
    const id = req.params.id
    const todoMessage = req.body.todo
    const checked = req.body.checked
    if (!todoMessage && checked === undefined) {
        res.send('Request Body should not be empty...')
    } else {
        User.updateOne(
            { _id: req.user._id, 'todo._id': id },
            {
                $set: { 'todo.$.todo': todoMessage, 'todo.$.checked': checked }
            },
            (err) => {
                if (err) {
                    res.send(400)
                } else {
                    res.send('Updated succesfully')
                }
            }
        )
    }
})

app.post('/', (req, res) => {
    const todoMessage = req.body
    const newTodo = new MongoDB({
        todo: todoMessage.todo,
        checked: false
    })
    User.findById(req.user._id, (err, user) => {
        if (err) {
            res.sendStatus(404)
        } else {
            user.todo.push(newTodo)
            user.save((err) => {
                if (err) {
                    res.sendStatus(503)
                } else {
                    res.send('success')
                }
            })
        }
    })
})
const PORT = process.env.PORT

app.listen(PORT, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Server started at port ${PORT}...`)
    }
})

