const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const profileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    }
});

const credentialsSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const userSchema = new mongoose.Schema(
    {
        profile : {
            name : {
                type : String,
                required : true
            },
            email : {
                type : String,
                required : true,
                unique : true
            }
        },
        credentials : {
            username : {
                type : String,
                unique : true,
                required : true
            },
            password : {
                type : String,
                required : true
            }
        },
        role : {
            type : String,
            default : "USER_NORMAL"
        }
    }
);

userSchema.pre('save', async function (next){
    if(this.isModified('credentials.password')){
        this.credentials.password = await bcrypt.hash(this.credentials.password, 10);
    }
    next();
});

const User = new mongoose.model('User', userSchema);

module.exports = User; 