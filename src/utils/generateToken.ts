import { Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const generateTokenAndSetCookie = (id: mongoose.Types.ObjectId, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '1d'
  })

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: 'strict' // CSRF attacks cross-site request forgery attacks
    // secure: process.env.NODE_ENV !== "development",
  })
  return token
}

export default generateTokenAndSetCookie
