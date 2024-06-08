const express = require("express");
const mongoose = require("mongoose");

const userRouter = express.Router();

const User = require('./Models/userModel')

// create user
userRouter.post("/create", async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
        console.log(error)
      res.status(400).send(error);
    }

});

// find user by id
userRouter.get("/users/:userId", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(error){
        console.log(error)
        res.end();
    }s
});


// find user by email
userRouter.get("users/email", async (req, res) => {
    try{
        const user  = await User.findOne({email: req.email})
        res.status(200).json(user);
    }catch(error){
        console.log(error)
        res.end()
    }
})


module.exports = userRouter;
