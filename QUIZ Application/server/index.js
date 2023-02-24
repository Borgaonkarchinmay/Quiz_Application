require('dotenv').config();
require('./Database/dbConnection');
const User = require('./models/userModels');
const express = require('express');
const bodyparser = require('body-parser');


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

app.get('/', (req, res)=>{
    res.send("Hello Chinmay");
});

app.post('/register', async (req, res)=>{
    try{
        console.log(req.body);
        const newDocument = new User(req.body);
        
        const result = await newDocument.save();
        res.send({message : "registrationSuccessful", result : result});

    }catch(err){
        console.log(err);
        res.send({message : "registrationFailed"});
    }
});

app.post('/getUser', async (req, res)=>{

    try{

        
        /*console.log(req.body);
        if (!req.credentials || !req.credentials.username) {
            // Handle the error or return an appropriate response
            res.send({message : "undefined"});
        }*/

        const findUserName = User.find({
            'credentials.username' : 'chinmaypb'
        });

        res.send(findUserName);

    }catch(err){
        console.log(err);
        res.send({message : "registrationFailed"});
    }
});



app.listen(8000, () => {
    console.log("Server listening at port " + 8000);
});