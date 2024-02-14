import bcrypt from 'bcrypt'
import { Response } from 'express'
import { Secret } from 'jsonwebtoken'
import UserModel, { I_UserDocument } from '~/models/user.model'
import generateTokenAndSetCookie from '~/utils/generateToken'

const jwtSecret: Secret = (process.env.JWT_SECRET as Secret) || 'trancongtien'
export async function register(user: I_UserDocument): Promise<void> {
  try {
    await UserModel.create(user)
  } catch (error: any) {
    throw new Error('tên người dùng đã tồn tại')
  }
}
export async function login(name: string, password: string, res: Response) {
  try {
    const user = await UserModel.findOne({ name })
    if (!user) {
      return { message: 'tên người dùng không tồn tại' }
    }
    const isMatch = bcrypt.compareSync(password, user?.get('password') || '')
    if (isMatch) {
      const accessToken = generateTokenAndSetCookie(user.id, res)
      return { data: user, accessToken: accessToken }
    }
    return { message: 'sai mật khẩu' }
  } catch (error: any) {
    console.log('Error logging in user', error.message)
    throw new Error('Error logging in user')
  }
}
