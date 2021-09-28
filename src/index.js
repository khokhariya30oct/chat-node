const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
// Express do internally same thing but we won't have control for socketIo
const server = http.createServer(app)
const io = socketio(server)

// for socketIO connection event

io.on('connection', (socket) => {
  socket.emit('greeting', 'Welcome')

  // Broadcast except current socket
  socket.broadcast.emit('greeting', 'A new user is joined!!!')

  // Getting request from client
  socket.on('sendMessage', (message) => {
    io.emit('greeting', `Welcome ${message}`)
  })

  // built-in request
  socket.on('disconnect', () => {
    io.emit('greeting', `User is left`)
  })

})



const PORT = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `)
})