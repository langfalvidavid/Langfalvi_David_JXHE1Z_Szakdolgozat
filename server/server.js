const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Szakdolgozat")

app.post('/register', (req, res) =>{
    UserModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) =>{
    const {username, password} = req.body
    UserModel.findOne({username: username})
    .then(user =>{
        if(user){
        if(user.password === password) {
            res.json('Sikeres bejelentkezés!')
        } else{
            res.json('Hibás jelszó!')
        }} else{
            res.json('Nem létezik ilyen fiók!')
        }
    })
})

app.listen(3000, () =>{
console.log('Server is running...')
})