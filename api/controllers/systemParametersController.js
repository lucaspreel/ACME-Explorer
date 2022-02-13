'use strict'
/* ---------------SYSTEM PARAMETERS---------------------- */
const mongoose = require('mongoose')
const SystemParameters = mongoose.model('SystemParameters')

exports.create_system_parameters = function (req, res) {
    // only administrators must be able to do that
    console.log("Create system parameters")
}

exports.read_system_parameters = function (req, res) {
    console.log("Read system parameters")
}

exports.update_system_parameters = function (req, res) {
    // only administrators must be able to do that
    console.log("Update system parameters")
}