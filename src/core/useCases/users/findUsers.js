import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'

export function buildFindUsersUseCase ({
  userRepository
}) {
  return async userData => {
    const newUser = await userRepository.create(userData)
    return newUser
  }
}

export default buildFindUsersUseCase({
  userRepository: UserRepository
})
