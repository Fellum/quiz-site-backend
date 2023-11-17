import { Router } from 'express'
import authRouter from './auth.js'
import quizRouter from './quiz.js'
import questionRouter from './question.js'
import filesRouter from './files.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/file', filesRouter)

router.use('/quiz', quizRouter)
router.use('/question', questionRouter)

export default router
