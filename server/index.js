const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer');
const http = require('http');
const socketIo = require('socket.io');


require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  }

const app = express()
app.use(express.json())

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "https://szakdoga-zeta.vercel.app");
   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
   next();
 })

app.use(cors({
    origin: "https://szakdoga-zeta.vercel.app",
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

app.get('/logout', (req,res) =>{
    res.clearCookie('token')
    return res.json('Sikeres kijelentkezés')
})

app.post('/register', (req, res) => {
    const { username, email } = req.body;

    UserModel.findOne({ email: email })
        .then(emailFound => {
            if (emailFound) {
                return res.json('Email cím foglalt');
            } else {
                UserModel.findOne({ username: username })
                    .then(pwFound => {
                        if (pwFound) {
                            return res.json('Felhasználónév foglalt');
                        } else {
                            UserModel.create(req.body)
                                .then(user => {
                                    const to = user.email;
                                    const subject = `${user.username}, jó szórakozást kívánunk!`;
                                    const text = `<a href="https://szakdoga-zeta.vercel.app/verify?${user._id}">Kattints erre a linkre a regisztrációd megerősítéséhez!</a>`;
                                    MailSend(to, subject, text);
                                    res.json('Felhasználó létrehozva');
                                })
                                .catch(err => res.json(err));
                        }
                    })
            }
        })
});


app.post('/login', (req, res) =>{
    const {username, password} = req.body
    UserModel.findOne({username: username})
    .then(user =>{
        if(user){
        if(user.password === password) {
            const token = jwt.sign({username: user.username}, 'langfalvi-david-szakdolgozat', {expiresIn:"1h"})
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

        const to = `${user.email}`
        const subject = 'Elfelejtett jelszó'
        const text = `A jelszava: ${user.password}`

MailSend(to, subject, text)

    })
})


const MailSend = (to, subject, text) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD
        }
      });
      
      let mailOptions = {
        from: 'Szojatek <szojatek.david.langfalvi@gmail.com>',
        to: to,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          return res.json('Email elküldve')
        }
      });
}

const server = http.createServer(app);
const io = socketIo(server);

// Szobák tárolására
const rooms = {};

io.on('connection', socket => {
    console.log('Egy új kliens csatlakozott:', socket.id);

    // Ha egy kliens csatlakozik egy szobához
    socket.on('joinRoom', roomID => {
        // Csatlakozás a megadott szobához
        socket.join(roomID);
        // Ha a szoba még nem létezik, létrehozzuk
        if (!rooms[roomID]) {
            rooms[roomID] = [];
        }
        // Hozzáadjuk a kliens socket ID-jét a szobához
        rooms[roomID].push(socket.id);
        // Elküldjük az összes szobában lévő kliensnek a szobában lévő kliensek listáját
        io.to(roomID).emit('roomPlayers', rooms[roomID]);
    });

    // Küldjön meghívó linket az email címre
    socket.on('sendInvitation', (roomID, email) => {
        // A meghívó link összeállítása
        const invitationLink = `https://szakdoga-zeta.vercel.app/room/${roomID}`;
        
        // A NodeMailer konfigurációja (a valós SMTP adatokkal cseréld ki)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
          }
        });
        
        // Az email üzenet konfigurációja
        const mailOptions = {
            from: 'Szojatek <szojatek.david.langfalvi@gmail.com>',
            to: email,
            subject: 'Meghívó a játékszobába',
            text: `Kedves játékos! Itt van a meghívó link a játékszobához: ${invitationLink}`
        };
        
        // Az email küldése
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Hiba történt az email küldése közben:', error);
            } else {
                console.log('Az email sikeresen elküldve:', info.response);
            }
        });
    })
});


app.listen(3000, () =>{
console.log('Server is running...')
})


