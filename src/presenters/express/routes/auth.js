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
import refreshTokenSchema from '../schemas/auth/refreshToken.js'
import registerSchema from '../schemas/auth/register.js'

import registerMethod from '../helpers/registerMethod.js'

const router = Router()

registerMethod(router, {
  method: 'post',
  route: '/login',
  auth: 'none',
  ...loginSchema
}, async (request, response) => {
  const { email, password } = request.body
  const { refreshToken, ...rest } = await loginUseCase(email, password)
  response.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true
  })
  return {
    body: rest
  }
})

registerMethod(router, {
  method: 'get',
  route: '/startSession',
  auth: 'none',
  ...startSessionSchema
}, async (request, response) => {
  const { refreshToken, ...rest } = await startSessionUseCase()
  response.cookie('refreshToken', refreshToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true
  })
  return {
    body: rest
  }
})

registerMethod(router, {
  method: 'post',
  route: '/logout',
  auth: 'anonymousOrUser'
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

registerMethod(router, {
  method: 'post',
  route: '/refreshToken',
  customAuth: [
    withJWT({ ignoreExpiration: true }),
    withSession()
  ],
  ...refreshTokenSchema
}, async (request, response) => {
  const { refreshToken: oldRefreshToken } = request.cookies
  const { session: { id: sessionId } } = request
  const { refreshToken: newRefreshToken, ...rest } = await refreshTokenUseCase(sessionId, oldRefreshToken)

  response.cookie('refreshToken', newRefreshToken, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true
  })
  return {
    body: rest
  }
})

export default router
