import { Router } from 'express'
import authRouter from './auth.js'
import quizRouter from './quiz.js'
import questionRouter from './question.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/quiz', quizRouter)
router.use('/question', questionRouter)

export default router
