const User = require('../models/userModel');
const UserController = require('./userController');

function registerUser(req, res){
    const name = req.body.name;
    const email = req.body.email;
    User.findOne({name:name}).then(
        function (user){
            if(user){
                res.status(409).json({message: "Name already in use"})
            }else{
                User.findOne({email:email}).then(
                    function (user) {
                        if (user) {
                            res.status(409).json({message: "Email already in use"})
                        } else {
                            UserController.createUser(req, res)
                        }
                    }
                );
            }
        }
    )
}

function loginUser(req, res){
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email}).then(
        function (user){
            if(user){
                user.validatePassword(password).then(
                    function (result){
                        if(result){
                            res.status(200).json({message: "Login successful"})
                        }else{
                            res.status(401).json({message: "Invalid password"})
                        }
                    }
                )
            }else{
                res.status(404).json({message: "User not found"})
            }
        }
    )
}

module.exports = {registerUser, loginUser};