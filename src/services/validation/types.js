import _ from 'lodash'

export const object = (properties, required, additionalProperties = false) => {
  return _.omitBy({
    type: 'object',
    properties,
    required,
    additionalProperties
  }, _.isUndefined)
}

export const array = (items) => ({
  type: 'array',
  items
})

export const number = (minimum = 0, maximum = Number.MAX_SAFE_INTEGER) => ({
  type: 'number',
  minimum,
  maximum
})

export const integer = (minimum = 0, maximum = Number.MAX_SAFE_INTEGER) => ({
  type: 'integer',
  minimum,
  maximum
})

export const string = (minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => ({
  type: 'string',
  minLength,
  maxLength
})

export const any = () => ({
  type: 'any'
})

export const uuid = () => ({
  type: 'string',
  format: 'uuid'
})

export const email = () => ({
  type: 'string',
  format: 'email'
})
