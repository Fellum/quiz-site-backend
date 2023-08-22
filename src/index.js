import express, { json } from 'express'
import router from './presenters/express/routes/index.js'
const app = express()

app.use(json())
app.use(router)

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
