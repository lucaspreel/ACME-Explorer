'use strict'
/* ---------------ACTOR---------------------- */
const mongoose = require('mongoose')
const Actor = mongoose.model('Actors')

exports.list_all_actors = function (req, res) {

    Actor.find({deleted: false}, function (err, actors) {
        if (err) 
        {
            res.status(500).send(err)
        } 
        else 
        {
            res.json(actors)
        }
    })

}

exports.create_an_actor = function (req, res) {

    const newActor = new Actor(req.body)

    const sessionActorRole = ["EXPLORER"];//fake variable value for testing purposes

    //if the new actor role is administrator or manager
    //and the session actor role is not administrator
    //then the actor cannot be created
    if((newActor.role.includes("ADMINISTRATOR") || newActor.role.includes("MANAGER")) && !sessionActorRole.includes("ADMINISTRATOR"))
    {
        return res.status(403).send()
    }

    newActor.save(function (err, actor) {
        if (err) 
        {
            if (err.name === 'ValidationError') 
            {
                res.status(422).send(err)
            }
            else
            {
                res.status(500).send(err)
            }
        }
        else 
        {
            res.status(201).json(actor)
        }
    })

}

exports.read_an_actor = function (req, res) {

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {

        if (!actor1) 
        {
            res.status(404).send()
        }
        else
        {

            Actor.findById(req.params.actorId, function (err, actor) {
                if(err) 
                {
                    res.status(500).send(err)
                } 
                else 
                {
                    res.json(actor)
                }
            })

        }
    
    })
    .catch((error) => {
        res.status(500).send(error)
    })

}

exports.update_an_actor = function (req, res) {

    const sessionActorRole = ["EXPLORER"];//fake variable value for testing purposes
    const sessionActorId = 0;//fake variable value for testing purposes

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {
    
        if(!actor1) 
        {
            res.status(404).send()
        }
        else
        {

            //if the session actor role is not administrator
            //the actor only can modify his or her own actor
            if(!sessionActorRole.includes("ADMINISTRATOR") && sessionActorId != actor1._id)
            {
                return res.status(403).send()
            }

            Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
                if(err) 
                {
                    if (err.name === 'ValidationError') 
                    {
                        res.status(422).send(err)
                    }
                    else
                    {
                        res.status(500).send(err)
                    }
                } 
                else 
                {
                    res.json(actor)
                }
            })

        }
    })
    .catch((error) => {
        res.status(500).send(error)
    })

}

exports.delete_an_actor = function (req, res) {

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {
      
        if (!actor1) 
        {
            res.status(404).send()
        }
        else
        {

            Actor.delete({ _id: req.params.actorId }, function (err, actor) {
                if(err) 
                {
                    res.status(500).send(err)
                }
                else 
                {
                    res.json({ message: 'Actor successfully deleted' })
                }
            })

        }

    })
    .catch((error) => {
        res.status(500).send(error)
    })

}

exports.ban_an_actor = function (req, res) {

    const sessionActorRole = ["ADMINISTRATOR"];//fake variable value for testing purposes

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {
    
        if(!actor1) 
        {
            res.status(404).send()
        }
        else
        {

            if(!sessionActorRole.includes("ADMINISTRATOR"))
            {
                return res.status(403).send()
            }

            Actor.findOneAndUpdate({ _id: req.params.actorId }, {isActive: false}, { new: true }, function (err, actor) {
                if(err) 
                {
                    res.send(err)
                } 
                else 
                {
                    res.json(actor)
                }
            })

        }
    })
    .catch((error) => {
        res.status(500).send(error)
    })

}

exports.unban_an_actor = function (req, res) {

    const sessionActorRole = ["ADMINISTRATOR"];//fake variable value for testing purposes

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {
    
        if(!actor1) 
        {
            res.status(404).send()
        }
        else
        {

            if(!sessionActorRole.includes("ADMINISTRATOR"))
            {
                return res.status(403).send()
            }

            Actor.findOneAndUpdate({ _id: req.params.actorId }, {isActive: true}, { new: true }, function (err, actor) {
                if(err) 
                {
                    res.send(err)
                } 
                else 
                {
                    res.json(actor)
                }
            })

        }
    })
    .catch((error) => {
        res.status(500).send(error)
    })

}