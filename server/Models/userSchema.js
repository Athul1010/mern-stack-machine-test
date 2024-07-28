const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/mernstack')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    add: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now // Set default to current date and time
    }
    
});

// Model defining
const users = new mongoose.model("users", userSchema); 

module.exports = users;
