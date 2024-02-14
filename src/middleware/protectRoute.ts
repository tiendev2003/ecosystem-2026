import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No Token Provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' })
    }
    console.log('decoded: ', decoded)

    const user = await User.findById((decoded as jwt.JwtPayload).id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    req.body.user = user
    // req.user = user;

    next()
  } catch (error: any) {
    console.log('Error in protectRoute middleware: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default protectRoute
