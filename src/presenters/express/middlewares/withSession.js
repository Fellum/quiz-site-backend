import getSessionUseCase from '../../../core/useCases/auth/getSession.js'

export default () => async (request, response, next) => {
  try {
    const { sessionId } = request.jwtPayload
    request.session = await getSessionUseCase(sessionId)
    next()
  } catch (err) {
    next(err)
  }
}
