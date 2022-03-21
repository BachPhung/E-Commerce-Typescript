import express from 'express'

import {
    userRegister,
    userLogin
} from '../controllers/auth'

const router = express.Router()

//Path for authentication
router.post('/register', userRegister)
router.post('/login', userLogin)

export default router;