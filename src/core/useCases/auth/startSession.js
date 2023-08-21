import SessionRepository from '../../../data/postgresql/repositories/SessionRepository.js'
import * as authService from '../../../services/auth.js'

export function buildUseCase ({
  sessionRepository,
  authService
}) {
  return async () => {
    const refreshToken = authService.jwtCreateRefreshToken()
    const newSession = await sessionRepository.create({
      refreshToken,
      type: 'anonymous'
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
  sessionRepository: SessionRepository,
  authService
})
