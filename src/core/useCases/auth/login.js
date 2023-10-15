import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'
import SessionRepository from '../../../data/redis/repositories/SessionRepository.js'

import { buildUseCase as buildStartSessionUseCase } from './startSession.js'
import * as authService from '../../../services/auth.js'

export function buildUseCase ({
  userRepository,
  sessionRepository,
  authService
}) {
  const startSessionUseCase = buildStartSessionUseCase({
    sessionRepository,
    authService
  })
  return async (email, password) => {
    const foundUser = await userRepository.findOne({ email })
    if (!foundUser) throw new Error('Email or password incorrect')

    const passwordCorrect = authService
      .passwordVerify(password, foundUser.passwordHash, foundUser.passwordSalt)
    if (!passwordCorrect) throw new Error('Email or password incorrect')

    return startSessionUseCase({ userId: foundUser.id, type: 'user' })
  }
}

export default buildUseCase({
  userRepository: UserRepository,
  sessionRepository: SessionRepository,
  authService
})
