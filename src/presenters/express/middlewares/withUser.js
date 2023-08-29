import getUserUseCase from '../../../core/useCases/auth/getUser.js'

export default () => async (request, response, next) => {
  try {
    request.user = await getUserUseCase(request.session)
    next()
  } catch (err) {
    next(err)
  }
}
