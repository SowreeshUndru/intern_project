const { validationResult } = require('express-validator');
const User = require('../models/usermodel.js');
const bcrypt = require('bcrypt');
const redisclient = require("../services/redis.js");
const LostItem = require('../models/lostitems.js');
const FoundItem = require('../models/founditems.js');


async function responsecontrol(req, res) {
    const email=req.user.email;
    const userdetails=await User.findOne({email:email},{new:true}).populate("yourLostItems").populate("yourFoundItems");

    console.log(userdetails);

    res.status(200).json({
        status: true,
        message: "user details",
        data: userdetails,
        email:email,
        id:userdetails._id,
    });
}

module.exports = {
    responsecontrol
};