import SessionRepository from '../../../data/redis/repositories/SessionRepository.js'
import * as authService from '../../../services/auth.js'

export function buildUseCase ({
  sessionRepository,
  authService
}) {
  return async (session, refreshToken) => {
    const { id: sessionId, refreshToken: validRefreshToken } = session
    if (validRefreshToken !== refreshToken) throw new Error('Invalid refresh token')

    const newRefreshToken = authService.jwtSign({
      sessionId
    }, { keyType: 'REFRESH' })
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
