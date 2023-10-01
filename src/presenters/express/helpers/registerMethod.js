import _ from 'lodash'

import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'
import withUser from '../middlewares/withUser.js'

import validator from '../../../services/validation/index.js'

const authToMiddlewares = {
  none: [],
  anonymous: [withJWT(), withSession()],
  user: [withJWT(), withSession(), withUser()],
  anonymousOrUser: [withJWT(), withSession(), withUser({ skipIfEmpty: true })],
  any: [withJWT({ skipIfEmpty: true }), withSession({ skipIfEmpty: true }), withUser({ skipIfEmpty: true })]
}

function buildController (meta = {}, impl) {
  const controllerFunc = async (request, response, next) => {
    try {
      if (_.has(meta, 'input.body') &&
      !validator.validate(request.body, meta.input.body)) {
        console.log(request.body, meta.input.body)
        throw new Error(JSON.stringify(validator.getLastErrors(), null, 2))
      }
      if (_.has(meta, 'input.headers') &&
      !validator.validate(request.headers, meta.input.headers)) {
        throw new Error(JSON.stringify(validator.getLastErrors(), null, 2))
      }
      const result = await impl(request)
      if (_.has(meta, 'output.body') &&
      !validator.validate(result.body || {}, meta.output.body)) {
        throw new Error(JSON.stringify(validator.getLastErrors()))
      }
      if (_.has(meta, 'output.headers') &&
      !validator.validate(result.headers || {}, meta.output.headers)) {
        throw new Error(JSON.stringify(validator.getLastErrors()))
      }

      response.json(result.body)
      response.set(result.headers)
      response.end()
    } catch (error) { next(error) }
  }

  const middlewares = [controllerFunc]

  if (meta.auth && !meta.customAuth) {
    const authMiddlewares = authToMiddlewares[meta.auth]
    if (!authMiddlewares) throw new Error(`Incorrect method auth type: ${meta.auth}`)
    middlewares.unshift(...authMiddlewares)
  }
  if (meta.customAuth) { middlewares.unshift(...meta.customAuth) }

  return middlewares
}

export default function registerMethod (app, meta, impl) {
  const method = meta.method || 'POST'
  const route = meta.route || '/'

  app[method](route, buildController(meta, impl))
}
