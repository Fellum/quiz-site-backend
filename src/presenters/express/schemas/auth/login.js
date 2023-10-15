import { buildAndCreateSchema } from '../../../../services/validation/helpers.js'
import * as types from '../../../../services/validation/types.js'

export const inputBody = buildAndCreateSchema('loginInputSchema', types.object({
  email: types.email(),
  password: types.string()
}, ['email', 'password']))

export const outputBody = buildAndCreateSchema('loginOutputSchema', types.object({
  token: types.string()
}, ['token']))

export default {
  input: {
    body: inputBody
  },
  output: {
    body: outputBody
  }
}
