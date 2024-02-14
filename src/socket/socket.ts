import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
})

interface UserSocketMap {
  [key: string]: string
}

const userSocketMap: UserSocketMap = {} // {userId: socketId}

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  const userId: string = socket.handshake.query.userId as string
  if (userId !== 'undefined') userSocketMap[userId] = socket.id

  // io.emit() is used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, io, server }

