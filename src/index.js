import express from 'express'

const app = express()

app.get('/', (request, response) => {
  response.send('sos')
})

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
