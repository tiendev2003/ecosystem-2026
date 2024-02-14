import bodyParser from 'body-parser'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import connectToMongoDB from '~/db/connectToMongoDB'
import authRouter from './routers/auth.routes'
import userRouter from './routers/user.routes'
import { app, server } from './socket/socket'
dotenv.config()
console.log(process.env.CLOUDINARY_NAME)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }))
// using mutilpart form data

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.set('views', path.join(__dirname, 'views'))

app.get('/upload', (req, res) => {
  res.render('upload')
})

app.set('view engine', 'ejs')

server.listen(PORT, async () => {
  await connectToMongoDB()

  console.log(`Server is running on port ${PORT}`)
})
