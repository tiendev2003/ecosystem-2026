import { Request, Response } from 'express'

import { login, register } from '~/services/auth.service'
import { getErrorMessage } from '~/utils/err.message'
export const loginController = async (req: Request, res: Response) => {
  try {
    console.log(req.body.name, req.body.password)
    const foundUser = await login(req.body.name, req.body.password, res)
    if (foundUser) {
      res.status(200).send(foundUser)
    } else {
      res.status(401).send('Invalid credentials')
    }
  } catch (error: any) {
    return res.status(500).json({ message: getErrorMessage(error) })
  }
}
export const registerController = async (req: Request, res: Response) => {
  try {
    await register(req.body)
    res.status(201).send('User registered')
  } catch (error: any) {
    return res.status(500).json({ mesage: getErrorMessage(error) })
  }
  // ...
}
