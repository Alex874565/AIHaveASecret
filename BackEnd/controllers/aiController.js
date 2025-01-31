const AI = require('../models/aiModel');

function createAI(req, res){
    const ai = new AI({
        name: req.body.name,
        creator: req.body.creator,
        description: req.body.description,
        system_prompt: req.body.system_prompt,
        secret: req.body.secret,
        hints: req.body.hints
    });
    ai.save().then(function(){
        res.status(201).json({success: "AI created"})
    }).catch(function(err){
        res.status(400).json({error: err.message})
    })
}

function deleteAI(req, res){
    AI.findOneAndDelete({name: req.params.name, creator: req.params.creator}).then(function(ai){
        if(ai){
            res.status(200).json({success: "AI deleted"})
        }else{
            res.status(404).json({error: "AI not found"})
        }
    }
    ).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

function updateAI(req, res){
    AI.findOneAndUpdate({name : req.params.name, creator: req.params.creator}, req.body).then(function(ai){
        if(ai){
            res.status(200).json({success: "AI updated"})
        }else{
            res.status(404).json({error: "AI not found"})
        }
    }
    ).catch(function(err){
        res.status(400).json({error: err.message})
    })
}

function findAI(req, res){
    AI.findOne({name : req.params.name, creator: req.params.creator}).then(function(ai){
        if(ai){
            res.status(200).json(ai)
        }else{
            res.status(404).json({message: "AI not found"})
        }
    }).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

function findCreatorAIs(req, res){
    AI.find({creator: req.params.creator}).then(function(ais){
        if(ais.length > 0){
            res.status(200).json(ais)
        }else{
            res.status(404).json({message: "AIs not found"})
        }
    }).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

function findAllAIs(req, res){
    AI.find().then(function(ais){
        if(ais){
            res.status(200).json(ais)
        }else{
            res.status(404).json({message: "AIs not found"})
        }
    }).catch(function(err){
        res.status(400).json({message: err.message})
    })
}

module.exports = {createAI, deleteAI, updateAI, findAI, findCreatorAIs, findAllAIs};