import logger from '../../../services/logger.js'

export default (err, request, res, next) => {
  logger.error(`url: ${request.url}, body: ${JSON.stringify(request.body)}, error: ${err.stack}`)
  res.status(500)
  res.send({
    error: err.message
  })
}
