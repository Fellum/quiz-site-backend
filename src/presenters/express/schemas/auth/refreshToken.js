import { buildAndCreateSchema } from '../../../../services/validation/helpers.js'
import * as types from '../../../../services/validation/types.js'

export const inputBody = buildAndCreateSchema('refreshTokenInputSchema', types.object({}))

export const outputBody = buildAndCreateSchema('refreshTokenOutputSchema', types.object({
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
