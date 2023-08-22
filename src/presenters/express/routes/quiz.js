import _ from 'lodash'
import { Router } from 'express'

import createUseCase from '../../../core/useCases/quizzes/create.js'
import findUseCase from '../../../core/useCases/quizzes/find.js'
import getByIdUseCase from '../../../core/useCases/quizzes/getById.js'
import deleteUseCase from '../../../core/useCases/quizzes/delete.js'
import updateUseCase from '../../../core/useCases/quizzes/update.js'
import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'
import withUser from '../middlewares/withUser.js'

const router = Router()

router.use(withJWT(), withSession())

router.post('/', withUser(), async (request, response) => {
  const { title, description } = request.body
  const { id: ownerUserId } = request.user

  await createUseCase({ title, description, ownerUserId })
    .then(res => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
})

router.get('/:id', async (request, response) => {
  await getByIdUseCase(request.params.id)
    .then(res => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
})

router.patch('/', withUser(), async (request, response) => {
  const { id, title, description } = request.body
  const { id: userId } = request.user

  const value = _.omitBy({
    id,
    title,
    description
  }, _.isUndefined)

  await updateUseCase(userId, value)
    .then(res => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
})

router.get('/', async (request, response) => {
  const { offset, limit } = request.body

  await findUseCase({ offset, limit })
    .then(res => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
})

router.delete('/', withUser(), async (request, response) => {
  const { id: userId } = request.user
  const { id: quizId } = request.body

  await deleteUseCase(userId, quizId)
    .then(res => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
  response.end()
})

export default router
