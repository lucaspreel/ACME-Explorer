'use strict'
/* ---------------SPONSORSHIPS---------------------- */
const mongoose = require('mongoose')
const Sponsorship = mongoose.model('Sponsorship')

exports.create_a_sponsorship = function (req, res) {
    console.log("Create a sponsorship")
}

exports.list_all_sponsorships = function (req, res) {
    console.log("List all sponsorships")
}

exports.read_a_sponsorship = function (req, res) {
    // must only be possible if the sponsorship was paid
    console.log("Read a sponsorship")
}

exports.update_a_sponsorship = function (req, res) {
    // only the sponsor concerned by this sponsorship must be able to do that
    console.log("Update a sponsorship")
}

exports.delete_a_sponsorship = function (req, res) {
    // only the sponsor concerned by this sponsorship must be able to do that
    console.log("Delete a sponsorship")
}

exports.pay_a_sponsorship = function (req, res) {
    // only the sponsor concerned by this sponsorship must be able to do that
    console.log("Pay a sponsorship")
}