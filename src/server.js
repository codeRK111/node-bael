import express from 'express'
import User from './socket/namespace_user'
import Admin from './socket/namespace_admin'
import AdminCounter from './socket/counter'
// import path from "path";
// import bodyParser from "body-parser";

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/chatbot', { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) => console.log(error))

const adminOnline = new AdminCounter()

User(io, adminOnline)
Admin(io, adminOnline)

const PORT = 5000
server.listen(PORT)
