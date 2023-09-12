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

export function defaultSchemaTemplate (route, schemas) {
  return {
    input: {
      body: schemas?.input?.body || createSchema(buildEmptySchema(`${route}InputSchema`)),
      headers: schemas?.input?.headers || createSchema(buildEmptySchema(`${route}HeadersInputSchema`))
    },
    output: {
      body: schemas?.output?.body || createSchema(buildEmptySchema(`${route}OutputSchema`)),
      headers: schemas?.output?.headers || createSchema(buildEmptySchema(`${route}HeadersOutputSchema`))
    }
  }
}
