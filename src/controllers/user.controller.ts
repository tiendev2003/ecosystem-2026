import { v2 as cloudinary } from 'cloudinary'
import { Request, Response } from 'express'
import UserModel from '~/models/user.model'
export const userProfile = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    res.status(200).json({
      data: user,
      status: 'success'
    })
  } catch (error: any) {
    console.log('Error getting user profile: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = req.body.user

    // Get the file from the request

    const file = req.file!
    if (!file) {
      return res.status(400).json({ error: 'Please upload an image' })
    }
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true
    }

    // Upload the image
    const image = await cloudinary.uploader.upload(file.path, options)

    user.avatar = image.url
    UserModel.updateOne({ id: user.id }, user)

    res.status(200).json({
      data: user,
      status: 'success'
    })
  } catch (error: any) {
    console.log('Error updating user profile: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = req.body.user
    console.log(user)
    const users = await UserModel.find({ _id: { $ne: user._id } })
    res.status(200).json(users)
  } catch (error: any) {
    console.log('Error getting all users: ', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
}
