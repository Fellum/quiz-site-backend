import { Router } from 'express'
import loginUseCase from '../../../core/useCases/auth/login.js'
import logoutUseCase from '../../../core/useCases/auth/logout.js'
import refreshTokenUseCase from '../../../core/useCases/auth/refreshToken.js'
import startSessionUseCase from '../../../core/useCases/auth/startSession.js'
import registerUseCase from '../../../core/useCases/auth/register.js'
import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'

import loginSchema from '../schemas/auth/login.js'
import startSessionSchema from '../schemas/auth/startSession.js'
import logoutSchema from '../schemas/auth/logout.js'
import registerSchema from '../schemas/auth/register.js'

import registerMethod from '../helpers/registerMethod.js'

const router = Router()

registerMethod(router, {
  method: 'post',
  route: '/login',
  auth: 'none',
  ...loginSchema
}, async request => {
  const { email, password } = request.body
  const result = await loginUseCase(email, password)
  return {
    body: result
  }
})

registerMethod(router, {
  method: 'get',
  route: '/startSession',
  auth: 'none',
  ...startSessionSchema
}, async () => {
  const result = await startSessionUseCase()
  return {
    body: result
  }
})

registerMethod(router, {
  method: 'post',
  route: '/logout',
  auth: 'user',
  ...logoutSchema
}, async request => {
  const { session: { id: sessionId } } = request
  await logoutUseCase(sessionId)
  return {}
})

registerMethod(router, {
  method: 'post',
  route: '/register',
  auth: 'none',
  ...registerSchema
}, async request => {
  const { email, username, password } = request.body

  const result = await registerUseCase({ email, username, password })
  return { body: result }
})

router.post('/refreshToken',
  withJWT({ ignoreExpiration: true }),
  withSession(),
  async (request, response, next) => {
    const { refreshToken } = request.body
    const { session: { id: sessionId } } = request
    await refreshTokenUseCase(sessionId, refreshToken)
      .then((res) => response.send(res))
      .catch(next)
  })

export default router
