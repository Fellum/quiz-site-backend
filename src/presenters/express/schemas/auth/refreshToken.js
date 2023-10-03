import { buildAndCreateSchema } from '../../../../services/validation/helpers.js'
import * as types from '../../../../services/validation/types.js'

export const inputBody = buildAndCreateSchema('refreshTokenInputSchema', types.object({
  refreshToken: types.string()
}, ['refreshToken']))

export const outputBody = buildAndCreateSchema('refreshTokenOutputSchema', types.object({
  refreshToken: types.string()
}, ['refreshToken']))

export default {
  input: {
    body: inputBody
  },
  output: {
    body: outputBody
  }
}
