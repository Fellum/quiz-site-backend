import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'

export function buildUseCase ({
  userRepository
}) {
  return async (session) => {
    if (session.type !== 'user') throw new Error('Must be user')
    const user = await userRepository.findOne({ id: session.userId })
    if (!user) throw new Error('User not found')

    return user
  }
}

export default buildUseCase({
  userRepository: UserRepository
})
