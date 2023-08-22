import SessionRepository from '../../../data/redis/repositories/SessionRepository.js'

export function buildUseCase ({
  sessionRepository
}) {
  return async (sessionId) => {
    const session = await sessionRepository.getById(sessionId)
    if (!session) throw new Error('Session expired')

    return session
  }
}

export default buildUseCase({
  sessionRepository: SessionRepository
})
