import SessionRepository from '../../../data/postgresql/repositories/SessionRepository.js'
import * as authService from '../../../services/auth.js'

export function buildUseCase ({
  sessionRepository,
  authService
}) {
  return async (sessionId, refreshToken) => {
    const foundSession = await sessionRepository.findOne({
      id: sessionId
    })
    if (!foundSession) throw new Error('Session expired')
    if (foundSession.refreshToken !== refreshToken) throw new Error('Invalid refresh token')

    const newRefreshToken = authService.jwtCreateRefreshToken()
    await sessionRepository.updateById(sessionId, {
      refreshToken: newRefreshToken
    })

    const token = authService.jwtSign({
      sessionId
    })

    return {
      token,
      refreshToken: newRefreshToken
    }
  }
}

export default buildUseCase({
  sessionRepository: SessionRepository,
  authService
})
