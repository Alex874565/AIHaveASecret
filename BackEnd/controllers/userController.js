const User = require('../models/userModel');
const mongoose = require('mongoose');

function createUser(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(function(){
        res.status(201).json({message: "User created"})
    }).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

function deleteUser(req, res){
    User.findOneAndDelete({name : req.params.name}).then(function(user){
        if(user){
            res.status(200).json({message: "User deleted"})
        }else{
            res.status(404).json({message: "User not found"})
        }
    }
    ).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

function updateUser(req, res){
    User.findOneAndUpdate({name : req.params.name}, req.body).then(function(user){
        if(user){
            res.status(200).json({message: "User updated"})
        }else{
            res.status(404).json({message: "User not found"})
        }
    }
    ).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

function findUser(req, res){
    User.findOne({name : req.params.name}).then(function(user){
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: "User not found"})
        }
    }).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

module.exports = {createUser, deleteUser, updateUser, findUser};