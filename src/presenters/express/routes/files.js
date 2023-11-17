import _ from 'lodash'
import { Router } from 'express'

import path from 'path'

import uploadUseCase from '../../../core/useCases/files/upload.js'
import downloadUseCase from '../../../core/useCases/files/download.js'

import withJWT from '../middlewares/withJWT.js'
import withSession from '../middlewares/withSession.js'
import withUser from '../middlewares/withUser.js'
import uploadMiddleware from '../middlewares/fileUploader.js'



const router = Router()

router.use(withJWT(), withSession())

router.post('/upload',
  withUser(),
  uploadMiddleware.single('file'),
  async (request, response, next) => {
    const { id: ownerUserId } = request.user
    const { path: internalPath, encoding, mimetype, size } = request.file

    await uploadUseCase({ internalPath, encoding, mimetype, size, userId: ownerUserId })
      .then(res => response.send(res))
      .catch(next)
  })

router.get('/download/*',
  async (request, response, next) => {
    const result = await downloadUseCase({ externalPath: request.originalUrl })
      .catch(next)
    response.sendFile(path.resolve(result.internalPath))
    response.setHeader('Content-Type', result.mimetype)
    // response.pipe(fileStream)
    // response.send(result)
  })

export default router
