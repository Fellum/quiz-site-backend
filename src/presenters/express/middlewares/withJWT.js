import { jwtVerify } from '../../../services/auth.js'

const fromBodyExtractStrategy = request => request.body.token

export default ({ extractionStrategy = fromBodyExtractStrategy, ...options } = {}) => async (request, response, next) => {
  try {
    const token = extractionStrategy(request)
    const payload = jwtVerify(token, options)
    request.jwtPayload = payload
    next()
  } catch (err) {
    next(err)
  }
}
