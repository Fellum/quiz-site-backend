import knex from 'knex'
import { production } from './knexfile.js'
export default knex(production)
