import { Router } from 'express'
import loginUseCase from '../../../core/useCases/auth/login.js'
import logoutUseCase from '../../../core/useCases/auth/logout.js'
import refreshTokenUseCase from '../../../core/useCases/auth/refreshToken.js'
import startSessionUseCase from '../../../core/useCases/auth/startSession.js'
import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'
import withUser from '../middlewares/withUser.js'

const router = Router()

router.post('/login', async (request, response) => {
  const { email, password } = request.body

  await loginUseCase(email, password)
    .then(res => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
})

router.get('/startSession', async (request, response) => {
  await startSessionUseCase()
    .then(res => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
})

router.post('/logout', withJWT(), withSession(), withUser(), async (request, response) => {
  const { session: { id: sessionId } } = request
  await logoutUseCase(sessionId)
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
  response.end()
})

router.post('/refreshToken', withJWT({ ignoreExpiration: true }), withSession(), withUser(), async (request, response) => {
  const { refreshToken } = request.body
  const { session: { id: sessionId } } = request
  await refreshTokenUseCase(sessionId, refreshToken)
    .then((res) => response.send(res))
    .catch(err => {
      console.log(err)
      response.send(err.message)
    })
})

export default router
