import SessionRepository from '../../../data/redis/repositories/SessionRepository.js'

export function buildUseCase ({
  sessionRepository
}) {
  return async (sessionId) => {
    await sessionRepository.deleteById(sessionId)
  }
}

export default buildUseCase({
  sessionRepository: SessionRepository
})
