import logger from '../../../services/logger.js'

export default (request, response, next) => {
  logger.info(`url: ${request.url}, body: ${JSON.stringify(request.body)}`)
  next()
}
