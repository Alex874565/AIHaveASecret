const nodemailer = require('nodemailer');

const User = require('../models/userModel');
const UserController = require('./userController');

const jwt = require("jsonwebtoken")

function registerUser(req, res){
    const name = req.body.name;
    const email = req.body.email;
    User.findOne({name:name}).then(
        function (user){
            if(user){
                res.status(409).json({error: "Name already in use"})
            }else{
                User.findOne({email:email}).then(
                    function (user) {
                        if (user) {
                            return res.status(409).json({error: "Email already in use"})
                        } else {
                            return UserController.createUser(req, res);
                        }
                    }
                );
            }
        }
    )
}

async function loginUser(req, res){
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({email:email});
    if(user){
        let passOk = await user.validatePassword(password);
        if(passOk){
            const token = generateAccessToken(email, password)
            return res.status(200).json({user: user, token: token})
        }else{
            return res.status(401).json({error: "Invalid password"})
        }
    }else{
        return res.status(409).json({error: "User not found"})
    }
}

function sendMail(req, res){
    const email = req.body.email
    const code = req.body.code
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alex.carpinisan@gmail.com',
            pass: process.env.GMAIL_PASS
        }
    });
    const mailOptions = {
        from: 'alex.carpinisan@gmail.com',
        to: email,
        subject: 'Auth Code',
        text: 'Your auth code is: ' + code,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.status(500).json({error: "Invalid email"})
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({success: "Email sent"})
        }
    });
}

async function checkUserExistence(req, res){
    const email = req.body.email
    const name = req.body.name

    let user = await User.findOne({name: name});

    let nameExists;

    nameExists = !!user;

    user = await User.findOne({email:email});

    let emailExists;

    emailExists = !!user;

    res.status(200).json({nameExists: nameExists, emailExists: emailExists})
}

function generateAccessToken(email, password){
    return jwt.sign({email : email, password : password}, process.env.TOKEN_SECRET, {noTimestamp : true});
}

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        next();
    })
}

module.exports = { registerUser, loginUser, sendMail, checkUserExistence, checkToken};