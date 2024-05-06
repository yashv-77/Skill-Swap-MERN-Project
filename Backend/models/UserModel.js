const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true,
    },
    password: {
        type: String,
        // required: true,
    },
    email:{
        type:String,
        // required:true
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1709915594~exp=1709916194~hmac=de5a781ab4cbc7d5937eb191c2a95a37e8f200fb6df671cdeecdef06fd6d2ea4",
    },
    skills: {
        type: [String], // Array of strings to store skills
        default: [],   // Default to an empty array
    },
    skillswant:{
        type: [String], // Array of strings to store skills
        default: [],   // Default to an empty array
    },
    expertise: {
        type: String, // Array of strings to store expertise
        required: false,   // Default to an empty array
    },
    age:{
        type:Number,
        default: null
    },
    city:{
        type:String,
        default: "Mumbai, IN"
    },
    college:{
        type:String,
        default: null
    },
    education:{
        type:String,
        default: null
    },
    experience:{
        type:String,
        default: "Fresher"
    },
    title:{
        type:String,
        default: null
    },
    description:{
        type:String,
        default: null
    },
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;