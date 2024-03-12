export function buildUseCase () {
  return async (user) => {
    const { username, email, id } = user
    return { username, email, id }
  }
}

export default buildUseCase()
