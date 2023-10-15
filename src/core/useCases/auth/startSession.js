import _ from 'lodash'
import SessionRepository from '../../../data/redis/repositories/SessionRepository.js'
import * as authService from '../../../services/auth.js'

export function buildUseCase ({
  sessionRepository,
  authService
}) {
  return async ({ userId, type = 'anonymous' } = {}) => {
    const value = _.omitBy({
      type,
      userId
    }, _.isUndefined)
    const {
      id: sessionId
    } = await sessionRepository.create(value)
    const refreshToken = authService.jwtSign({
      sessionId
    }, { keyType: 'REFRESH' })
    await sessionRepository.updateById(sessionId, {
      refreshToken
    })

    const token = authService.jwtSign({
      sessionId
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
