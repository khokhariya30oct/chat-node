const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
// Express do internally same thing but we won't have control for socketIo
const server = http.createServer(app)
const io = socketio(server)

// for socketIO connection event
let count = 0
io.on('connection', (socket) => {
  console.log('New socket connection ')
  socket.emit('countUpdated',count)
  
  socket.on('increment',() => {
    io.emit('countUpdated',++count)
  })
})



const PORT = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `)
})