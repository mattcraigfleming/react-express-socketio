const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// localhost port
const PORT = process.env.PORT || 4001

const app = express()

const server = http.createServer(app)

// Create websocket using instance of server just created
const io = socketIO(server)

// Socket.io syntax, check docs
io.on('connection', socket => {
  console.log('New client connected')
  socket.on('change color', color => {
    console.log('Color Changed to: ', color)
    io.sockets.emit('change color', color)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(PORT, () => console.log(`Websocket stream listening on: ${PORT}`))
