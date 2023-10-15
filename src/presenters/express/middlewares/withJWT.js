import { jwtVerify } from '../../../services/auth.js'

export default (options = {}) => async (request, response, next) => {
  try {
    const payload = jwtVerify(request.body.token, options)
    request.jwtPayload = payload
    next()
  } catch (err) {
    next(err)
  }
}
