import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

export interface I_UserDocument {
  name: string
  password: string
  avatar?: string
  nickname?: string
  phone?: string
  location?: object
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    password: { type: String, required: false },
    avatar: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    nickname: { type: String, required: false, default: '' },
    location: { type: Object, required: false, default: {} }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
)
UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const UserModel = mongoose.model<I_UserDocument>('User', UserSchema)
export default UserModel
