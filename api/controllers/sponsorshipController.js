'use strict'
/* ---------------SPONSORSHIPS---------------------- */
const mongoose = require('mongoose')
const Sponsorship = mongoose.model('Sponsorship')

exports.create_a_sponsorship = function (req, res) {
    const newSponsorship = new Sponsorship(req.body)

    newSponsorship.save(function (err, sponsorship) {
      if (err) {
        res.send(err)
      } else {
        res.json(sponsorship)
      }
    })
}

exports.list_all_sponsorships = function (req, res) {
    Sponsorship.find({}, function (err, sponsorships) {
        if (err) {
          res.send(err)
        } else {
          res.json(sponsorships)
        }
      })
}

exports.read_a_sponsorship = function (req, res) {
    // must only be possible if the sponsorship was paid
    Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
        if (err) {
          res.send(err)
        } else {
          res.json(sponsorship)
        }
      })
}

exports.update_a_sponsorship = function (req, res) {
    // only the sponsor concerned by this sponsorship must be able to do that
    Sponsorship.findOneAndUpdate({ _id: req.params.sponsorshipId }, req.body, { new: true }, function (err, sponsorship) {
        if (err) {
            res.send(err)
        } else {
            res.json(sponsorship)
        }
    })
}

exports.delete_a_sponsorship = function (req, res) {
    // only the sponsor concerned by this sponsorship must be able to do that
    Sponsorship.deleteOne({ _id: req.params.sponsorshipId }, function (err, sponsorship) {
        if (err) {
          res.send(err)
        } else {
          res.json({ message: 'Sponsorship successfully deleted' })
        }
      })
}

exports.pay_a_sponsorship = function (req, res) {
    // only the sponsor concerned by this sponsorship must be able to do that
    console.log("Pay a sponsorship")
}