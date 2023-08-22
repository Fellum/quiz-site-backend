import { createClient } from 'redis'
import { development } from './config.js'
const client = createClient(development)

client.on('error', err => console.log('Redis Client Error', err))

await client.connect()

export default client
