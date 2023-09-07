import logger from '../../../services/logger.js'

export default (err, request, res, next) => {
  logger.error(`url: ${request.url}, body: ${JSON.stringify(request.body)}, error: ${err.message}`)
  res.status(500)
  res.send({
    error: err.message
  })
}
