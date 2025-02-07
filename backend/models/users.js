const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        description: "name must be a string"
    },
    mobile:{
        type: String,
        description: "price must be a number"
    },
    email:{
        type: String,
        description: "email must be string"
    },
    password:{
        type: String,
        description: "password must be a string"
    },
    createdAt:{
        type: Date,
        description: "createdAt must be a date",
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        description:"updatedAt must be a date",
        default: Date.now()
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel