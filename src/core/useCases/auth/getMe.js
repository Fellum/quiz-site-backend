export function buildUseCase () {
  return async (user) => {
    const { username, email } = user
    return { username, email }
  }
}

export default buildUseCase()
