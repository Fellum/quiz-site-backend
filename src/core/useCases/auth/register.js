import UserRepository from '../../../data/postgresql/repositories/UserRepository.js'
import * as authService from '../../../services/auth.js'

export function buildCreateUserUseCase ({
  userRepository,
  authService
}) {
  return async ({ email, password, username }) => {
    // TODO: add some email, password, username validation
    const { emailExists, usernameExists } = await userRepository.usernameEmailExists({ username, email })
    if (emailExists) throw new Error('Email already taken')
    if (usernameExists) throw new Error('Username already taken')
    const passwordInfo = authService.passwordHash(password)
    // TODO: add email activation
    // TODO: hide password info in output somehow
    const newUser = await userRepository.create({
      email,
      username,
      ...passwordInfo
    })
    return newUser
  }
}

export default buildCreateUserUseCase({
  userRepository: UserRepository,
  authService
})
