const User = require('../models/userModel');
const mongoose = require('mongoose');

async function createUser(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await user.save().then(function(){
        return res.status(201).json({success: "User created"})
    }).catch(function(err){
        console.log(err)
        return res.status(400).json({error: err.message})
    })
}

function deleteUser(req, res){
    User.findOneAndDelete({name : req.params.name}).then(function(user){
        if(user){
            return res.status(200).json({success: "User deleted"})
        }else{
            return res.status(404).json({message: "User not found"})
        }
    }
    ).catch(function(err){
        return res.status(400).json({message: err.message})
    })
}

function updateUser(req, res){
    User.findOneAndUpdate({name : req.params.name}, req.body).then(function(user){
        if(user){
            return res.status(200).json({message: "User updated"})
        }else{
            return res.status(404).json({message: "User not found"})
        }
    }
    ).catch(function(err){
        return res.status(400).json({message: err.message})
    })
}

function findUser(req, res){
    User.findOne({name : req.params.name}).then(function(user){
        if(user){
            return res.status(200).json(user)
        }else{
            return res.status(404).json({message: "User not found"})
        }
    }).catch(function(err){
        return res.status(400).json({message: err.message})
    })
}

module.exports = {createUser, deleteUser, updateUser, findUser};