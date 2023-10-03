import getUserUseCase from '../../../core/useCases/auth/getUser.js'

export default (options = {}) => async (request, response, next) => {
  const { skipIfEmpty } = options
  try {
    request.user = await getUserUseCase(request.session)
    next()
  } catch (err) {
    if (skipIfEmpty) next()
    else next(err)
  }
}
