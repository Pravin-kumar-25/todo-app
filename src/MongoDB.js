import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost/todoDB")
// mongoose.connect('mongodb+srv://pravin-kumar-3:Godofwar-25@cluster0.bkyk0.mongodb.net/todoDB?retryWrites=true&w=majority')

// mongoose.set("useCreateIndex",true)

const todoSchema = new mongoose.Schema({
    checked:Boolean,
    todo: String
})

export default todoSchema