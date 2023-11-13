import { jwtVerify } from '../../../services/auth.js'

// const fromBodyExtractionStrategy = request => request.body.token
const fromHeaderExtractionStrategy = request => request.headers.token

export default ({ extractionStrategy = fromHeaderExtractionStrategy, ...options } = {}) => async (request, response, next) => {
  try {
    const token = extractionStrategy(request)
    const payload = jwtVerify(token, options)
    request.jwtPayload = payload
    next()
  } catch (err) {
    next(err)
  }
}
