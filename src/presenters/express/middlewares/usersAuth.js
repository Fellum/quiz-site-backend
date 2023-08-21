import authenticateUseCase from '../../../core/useCases/auth/authenticate.js'
import { jwtVerify } from '../../../services/auth.js'

export default (options = {}) => async (request, response, next) => {
  try {
    const { sessionId } = jwtVerify(request.headers.authtoken, options)
    const { user, session } = await authenticateUseCase(sessionId)
    request.session = session
    request.user = user
    next()
  } catch (err) {
    // console.log(err)
    next(err.message)
  }
}
