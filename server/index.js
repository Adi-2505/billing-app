// server.js
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const axios = require('axios')
require("./auth");

const mongoose = require('mongoose');
const userRouter = require("./userRouter");

const Billing = require('./Models/billingModel')

const User = require('./Models/userModel')

const Usage = require('./Models/usageModel')

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected');
})
.catch((err) => {
  console.error('MongoDB Connection Error:', err);
});

const app = express();

app.use(
  cors({
    origin: true, // React frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);


app.use(
  session({
    secret: "your_secret_key", 
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


// user router
app.use('api/user', userRouter);

// Middleware to parse JSON bodies
app.use(express.json());

// initialize google auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// googlr auth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/v/profile");
  }
);


// logout route
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  res.send()
});


// authentication route
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});


// zapire intigration using webhook
app.post('/api/invoice', async (req, res) => {

  const user = await User.findOne({email: req.body.email})

  const bill = await Billing.findOne({userId: user._id}) 

  await axios.post('https://hooks.zapier.com/hooks/catch/19090228/2obmcw5/', {
    email: req.body.email,
    amount: bill.amount,
    start: bill.start,
    end: bill.end
  })

  res.status(200).json({success: true});
})

app.get('/api/billing/:email', async (req, res) => {
  
  const user = await User.findOne({
    email: req.params.email
  })

  // console.log(user)


  const bill = await Billing.findOne({userId: user._id});

  // console.log(bill)

  res.status(200).json(bill);
})


app.get('/api/usage/:email', async (req, res) => {
  

  const user = await User.findOne({
    email: req.params.email
  })


  const usage = await Usage.findOne({userId: user._id});

  res.status(200).json(usage);
})

app.post('/api/usage', async (req, res)=>{

  const {_id, matrix1, matrix2, matrix3, userId} = req.body.usage;

  // console.log(req.body)

  const usage = await Usage.findByIdAndUpdate(_id, {
    matrix1: matrix1,
    matrix2: matrix2,
    matrix3: matrix3,
  })

  const bill = await Billing.findOneAndUpdate({userId: userId}, {
    amount: matrix1*10+matrix2*20+matrix3*30
  })

  

  console.log(bill)

  await axios.post('https://hooks.zapier.com/hooks/catch/19090228/2yvm0iz/', {
    userId: userId,
    start: bill.start,
    end: bill.end,
    amount: bill.amount
  })

  res.end();

})

app.post('/api/cost', (req, res)=>{
  const {cost} = req.body.cost
  console.log(cost);
  res.end();
})


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
