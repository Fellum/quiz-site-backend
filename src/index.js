import express, { json } from 'express'
import cors from 'cors'
import router from './presenters/express/routes/index.js'
import logger from './presenters/express/middlewares/logger.js'
import errorHandler from './presenters/express/middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(logger)
app.use(router)
app.use(errorHandler)

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`)
})
