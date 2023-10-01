import validator from './index.js'

export function buildSchema (name, schema) {
  return {
    id: name,
    title: name,
    ...schema
  }
}

export function createSchema (schema) {
  const { id: schemaId } = schema

  if (!validator.validateSchema(schema)) { throw new Error(JSON.stringify(validator.getLastErrors(), null, 2)) }

  return {
    $ref: schemaId
  }
}

export function buildEmptySchema (name) {
  return {
    id: name,
    title: name,
    type: 'object'
  }
}

export function buildAndCreateSchema (name, schema, required) {
  return createSchema(buildSchema(name, schema, required))
}
