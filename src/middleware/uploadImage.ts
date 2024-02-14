import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void
const fileStorage = multer.diskStorage({
  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, file.originalname)
  }
})

export const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}
const uploadImage = multer({ storage: fileStorage })
export default uploadImage
