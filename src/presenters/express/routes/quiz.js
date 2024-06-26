import _ from 'lodash'
import { Router } from 'express'

import createUseCase from '../../../core/useCases/quizzes/create.js'
import findUseCase from '../../../core/useCases/quizzes/find.js'
import getByIdUseCase from '../../../core/useCases/quizzes/getById.js'
import deleteUseCase from '../../../core/useCases/quizzes/delete.js'
import updateUseCase from '../../../core/useCases/quizzes/update.js'
import validateAnswers from '../../../core/useCases/quizzes/validateAnswers.js'
import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'
import withUser from '../middlewares/withUser.js'

const router = Router()

router.use(withJWT(), withSession())

router.post('/',
  withUser(),
  async (request, response, next) => {
    const { title, description, imageId } = request.body
    const { id: ownerUserId } = request.user

    await createUseCase({ title, description, ownerUserId, imageId })
      .then(res => response.send(res))
      .catch(next)
  })

router.get('/:id',
  async (request, response, next) => {
    await getByIdUseCase(request.params.id)
      .then(res => response.send(res))
      .catch(next)
  })

router.patch('/',
  withUser(),
  async (request, response, next) => {
    const { id, title, description, imageId } = request.body
    const { id: userId } = request.user

    const value = _.omitBy({
      id,
      title,
      description,
      imageId
    }, _.isUndefined)

    await updateUseCase(userId, value)
      .then(res => response.send(res))
      .catch(next)
  })

router.get('/',
  async (request, response, next) => {
    const { offset, limit, ownerUserId } = request.query

    await findUseCase({ offset, limit, ownerUserId })
      .then(res => response.send(res))
      .catch(next)
  })

router.delete('/',
  withUser(),
  async (request, response, next) => {
    const { id: userId } = request.user
    const { id: quizId } = request.body

    await deleteUseCase(userId, quizId)
      .then(res => response.send(res))
      .catch(next)
    response.end()
  })

router.post('/validateAnswers',
  async (request, response, next) => {
    const {
      quizId,
      answers
    } = request.body
    await validateAnswers(quizId, answers)
      .then(res => response.send(res))
      .catch(next)
    response.end()
  })
export default router
