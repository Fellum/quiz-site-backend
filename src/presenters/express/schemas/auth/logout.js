import { buildAndCreateSchema } from '../../../../services/validation/helpers.js'
import * as types from '../../../../services/validation/types.js'

export const inputHeaders = buildAndCreateSchema('logoutHeadersInputSchema', types.object({
  authtoken: types.string()
}, ['authtoken'], true))

export default {
  input: {
    headers: inputHeaders
  }
}
