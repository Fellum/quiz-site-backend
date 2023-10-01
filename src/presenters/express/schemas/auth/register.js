import { buildAndCreateSchema } from '../../../../services/validation/helpers.js'
import * as types from '../../../../services/validation/types.js'

export const inputBody = buildAndCreateSchema('registerInputSchema', types.object({
  email: types.email(),
  password: types.string(),
  username: types.string()
}, ['email', 'password', 'username']))

export const outputBody = buildAndCreateSchema('registerOutputSchema', types.object({
  id: types.string(),
  username: types.string(),
  email: types.email()
}, ['id', 'username', 'email']))

export default {
  input: {
    body: inputBody
  },
  output: {
    body: outputBody
  }
}
