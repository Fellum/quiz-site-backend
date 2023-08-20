import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'

export function buildCreateUserUseCase ({
  userRepository
}) {
  return async userData => {
    const newUser = await userRepository.create(userData)
    return newUser
  }
}

export default buildCreateUserUseCase({
  userRepository: UserRepository
})
