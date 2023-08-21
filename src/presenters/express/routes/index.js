import { Router } from 'express'
import authRouter from './auth.js'
import quizRouter from './quiz.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/quiz', quizRouter)

export default router
