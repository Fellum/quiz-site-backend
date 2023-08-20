import SessionRepository from '../../../data/postgresql/repositories/SessionRepository.js'

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
