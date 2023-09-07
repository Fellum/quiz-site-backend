import _ from 'lodash'
import { Router } from 'express'

import createUseCase from '../../../core/useCases/questions/create.js'
import findUseCase from '../../../core/useCases/questions/find.js'
import getByIdUseCase from '../../../core/useCases/questions/getById.js'
import deleteUseCase from '../../../core/useCases/questions/delete.js'
import updateUseCase from '../../../core/useCases/questions/update.js'
import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'
import withUser from '../middlewares/withUser.js'
import checkAccessUseCase from '../../../core/useCases/questions/checkAccess.js'

const router = Router()

router.use(withJWT(), withSession(), withUser())

router.post('/',
  async (request, response, next) => {
    const { text, answers, answerType, ord, quizId } = request.body
    const { id: userId } = request.user

    await checkAccessUseCase({ quizId, userId })
    await createUseCase({ text, answers, answerType, ord, quizId })
      .then(res => response.send(res))
      .catch(next)
  })

router.get('/:id',
  async (request, response, next) => {
    const { id: questionId } = request.params
    const { id: userId } = request.user

    await checkAccessUseCase({ questionId, userId })
      .then(() => getByIdUseCase(request.params.id))
      .then(res => response.send(res))
      .catch(next)
  })

router.patch('/',
  async (request, response, next) => {
    const { id, text, answers, answerType, ord, quizId } = request.body
    const { id: userId } = request.user

    const value = _.omitBy({
      id,
      text,
      answers,
      answerType,
      ord,
      quizId
    }, _.isUndefined)

    await checkAccessUseCase({ questionId: id, userId })
      .then(() => updateUseCase(value))
      .then(res => response.send(res))
      .catch(next)
  })

router.get('/',
  async (request, response, next) => {
    const { offset, limit } = request.body
    const { id: userId } = request.user

    await findUseCase({ offset, limit, userId })
      .then(res => response.send(res))
      .catch(next)
  })

router.delete('/',
  async (request, response, next) => {
    const { id: userId } = request.user
    const { id: questionId } = request.body

    await checkAccessUseCase({ userId, questionId })
      .then(() => deleteUseCase(questionId))
      .then(res => response.send(res))
      .catch(next)
    response.end()
  })

export default router
