import { createClient } from 'redis'
import { staging } from './config.js'
const client = createClient(staging)

client.on('error', err => console.log('Redis Client Error', err))

await client.connect()

export default client
