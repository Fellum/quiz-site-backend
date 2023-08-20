import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'

export function buildDeleteUserUseCase ({
  userRepository
}) {
  return async userId => {
    await userRepository.deleteById(userId)
  }
}

export default buildDeleteUserUseCase({
  userRepository: UserRepository
})
