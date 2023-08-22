import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'
import SessionRepository from '../../../data/redis/repositories/SessionRepository.js'
import * as authService from '../../../services/auth.js'

export function buildUseCase ({
  userRepository,
  sessionRepository,
  authService
}) {
  return async (email, password) => {
    const foundUser = await userRepository.findOne({ email })
    if (!foundUser) throw new Error('Email or password incorrect')

    const passwordCorrect = authService
      .passwordVerify(password, foundUser.passwordHash, foundUser.passwordSalt)
    if (!passwordCorrect) throw new Error('Email or password incorrect')

    const refreshToken = authService.jwtCreateRefreshToken()
    const newSession = await sessionRepository.create({
      userId: foundUser.id,
      refreshToken,
      type: 'user'
    })

    const token = authService.jwtSign({
      sessionId: newSession.id
    })

    return {
      token,
      refreshToken
    }
  }
}

export default buildUseCase({
  userRepository: UserRepository,
  sessionRepository: SessionRepository,
  authService
})
