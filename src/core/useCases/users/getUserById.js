import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'

export function buildGetUserByIdUseCase ({
  userRepository
}) {
  return async userId => {
    const user = await userRepository.findOne({ id: userId })
    return user
  }
}

export default buildGetUserByIdUseCase({
  userRepository: UserRepository
})
