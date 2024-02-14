import Router from 'express'
import { getAllUsers, updateUserProfile, userProfile } from '~/controllers/user.controller'
import protectRoute from '~/middleware/protectRoute'
import uploadImage from '~/middleware/uploadImage'
const router = Router()
router.get('/', protectRoute, userProfile)
router.get('/all', protectRoute, getAllUsers)
router.post('/updateProfile', [uploadImage.single('image'), protectRoute], updateUserProfile)

export default router
