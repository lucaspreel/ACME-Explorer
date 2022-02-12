'use strict'
/* ---------------ACTOR---------------------- */
const mongoose = require('mongoose')
const Actor = mongoose.model('Actors')

exports.list_all_actors = function (req, res) {

    Actor.find({}, function (err, actors) {
        if (err) 
        {
            res.send(err)
        } 
        else 
        {
            res.json(actors)
        }
    })

}

exports.create_an_actor = function (req, res) {

    const newActor = new Actor(req.body)

    newActor.save(function (err, actor) {
        if (err) 
        {
            res.send(err)
        } 
        else 
        {
            res.json(actor)
        }
    })

}

exports.read_an_actor = function (req, res) {

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {

        if (!actor1) 
        {
            return res.status(404).send()
        }
        else
        {

            Actor.findById(req.params.actorId, function (err, actor) {
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

exports.update_an_actor = function (req, res) {

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {
    
        if (!actor1) 
        {
            return res.status(404).send()
        }
        else
        {

            Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
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

exports.delete_an_actor = function (req, res) {

    Actor.findOne({_id: req.params.actorId}).then((actor1) => {
      
        if (!actor1) 
        {
            return res.status(404).send()
        }
        else
        {

            Actor.deleteOne({ _id: req.params.actorId }, function (err, actor) {
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