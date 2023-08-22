import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'
import SessionRepository from '../../../data/redis/repositories/SessionRepository.js'

export function buildUseCase ({
  userRepository,
  sessionRepository
}) {
  return async (sessionId) => {
    const session = await sessionRepository.getById(sessionId)
    if (!session) throw new Error('Session expired')

    if (session.type !== 'user') return { session, user: undefined }
    const user = await userRepository.findOne({ id: session.userId })
    if (!user) throw new Error('User not found')

    return {
      user,
      session
    }
  }
}

export default buildUseCase({
  userRepository: UserRepository,
  sessionRepository: SessionRepository
})
