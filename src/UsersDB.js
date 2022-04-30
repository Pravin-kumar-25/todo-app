import mongoose from "mongoose";
import findOrCreate from 'mongoose-findorcreate'
import todoSchema from "./MongoDB.js"
import passportLocalMongoose from 'passport-local-mongoose'

// mongoose.connect("mongodb://localhost/todoDB")
// mongoose.connect('mongodb+srv://pravin-kumar-3:Godofwar-25@cluster0.bkyk0.mongodb.net/todoDB?retryWrites=true&w=majority')


const userSchemea = new mongoose.Schema({
    email:String,
    password:String,
    googleId:String,
    todo: [todoSchema]
})

userSchemea.plugin(findOrCreate)
userSchemea.plugin(passportLocalMongoose) //passport local mongoose with schema

export default userSchemea