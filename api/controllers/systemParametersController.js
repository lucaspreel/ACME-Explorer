'use strict'
/* ---------------SYSTEM PARAMETERS---------------------- */
const mongoose = require('mongoose')
const SystemParameters = mongoose.model('SystemParameters')

exports.create_system_parameters = function (req, res) {
    console.log("Create system parameters")
}

exports.read_system_parameters = function (req, res) {
    console.log("Read system parameters")
}

exports.update_system_parameters = function (req, res) {
    console.log("Update system parameters")
}