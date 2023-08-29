import { Router } from 'express'
import loginUseCase from '../../../core/useCases/auth/login.js'
import logoutUseCase from '../../../core/useCases/auth/logout.js'
import refreshTokenUseCase from '../../../core/useCases/auth/refreshToken.js'
import startSessionUseCase from '../../../core/useCases/auth/startSession.js'
import registerUseCase from '../../../core/useCases/auth/register.js'
import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'
import withUser from '../middlewares/withUser.js'

const router = Router()

router.post('/login',
  async (request, response, next) => {
    const { email, password } = request.body

    await loginUseCase(email, password)
      .then(res => response.send(res))
      .catch(next)
  })

router.get('/startSession',
  async (request, response, next) => {
    await startSessionUseCase()
      .then(res => response.send(res))
      .catch(next)
  })

router.post('/logout',
  withJWT(),
  withSession(),
  withUser(),
  async (request, response, next) => {
    const { session: { id: sessionId } } = request
    await logoutUseCase(sessionId)
      .catch(next)
    response.end()
  })

router.post('/refreshToken',
  withJWT({ ignoreExpiration: true }),
  withSession(),
  withUser(),
  async (request, response, next) => {
    const { refreshToken } = request.body
    const { session: { id: sessionId } } = request
    await refreshTokenUseCase(sessionId, refreshToken)
      .then((res) => response.send(res))
      .catch(next)
  })

router.post('/register', async (request, response, next) => {
  const { email, username, password } = request.body

  await registerUseCase({ email, username, password })
    .then(res => response.send(res))
    .catch(next)
})

export default router
