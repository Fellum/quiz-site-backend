import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'
import SessionRepository from '../../../data/postgresql/repositories/SessionRepository.js'

export function buildUseCase ({
  userRepository,
  sessionRepository
}) {
  return async (sessionId) => {
    const session = await sessionRepository.findOne({ id: sessionId })
    if (!session) throw new Error('Session expired')

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
