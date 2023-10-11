const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer');
require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["szakdoga-frontend-8o775g64r-langfalvi-davids-projects.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB)

const verifyUser = (req, res, next) =>{
    const token = req.cookies.token
    console.log(token)
    if(!token){
        return res.json('Sikertelen bejelentkezés!')
    } else{
        jwt.verify(token, process.env.JWT_CONNECTION_STRING, (err, decoded) =>{
            if(err) return res.json('Hibás token!')
            next()
        })
    }
}

app.get('/', verifyUser, (req, res) =>{
    return res.json('Sikeres bejelentkezés!')
})

app.post('/register', (req, res) =>{
    const {username, email} = req.body

    UserModel.findOne({email: email})
    .then(emailFound =>{
        if(emailFound){
            return res.json('Email cím foglalt')
        } else{
            UserModel.findOne({username: username})
            .then(pwFound =>{
                if(pwFound){
                    return res.json('Felhasználónév foglalt')
                } else{
                    UserModel.create(req.body)
                    .then(users => res.json(users))
                    .catch(err => res.json(err))
                    return res.json('Felhasználó létrehozva')
                }
            })
        }
    })
    
})

app.post('/login', (req, res) =>{
    const {username, password} = req.body
    UserModel.findOne({username: username})
    .then(user =>{
        if(user){
        if(user.password === password) {
            const token = jwt.sign({username: user.username}, process.env.JWT_CONNECTION_STRING, {expiresIn:"1h"})
            res.cookie("token", token)
            res.json('Sikeres bejelentkezés!')
        } else{
            res.json('Hibás jelszó!')
        }} else{
            res.json('Nem létezik ilyen fiók!')
        }
    })
})

app.post('/forgot-password', (req, res) =>{
    const {email} = req.body
    UserModel.findOne({email: email})
    .then(user => {
        if(!user){
            return res.json('Nincs ilyen felhasználó')
        }
        const token = jwt.sign({id: user._id}, "langfalvi-david-forgot-password", {expiresIn: "1h"})
        

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

let mailOptions = {
  from: 'Szojatek <szojatek.david.langfalvi@gmail.com>',
  to: `${user.email}`,
  subject: 'Elfelejtett jelszó',
  text: `A jelszava: ${user.password}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    return res.json('Email elküldve')
  }
});
    })
})

app.listen(3000, () =>{
console.log('Server is running...')
})