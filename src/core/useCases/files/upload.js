import * as uuid from 'uuid'
import FileRepository from '../../../data/postgresql/repositories/FileRepository.js'

export function buildUseCase ({
  fileRepository
}) {
  return async ({ internalPath, userId, encoding, mimetype, size }) => {
    const externalPath = `/file/download/${uuid.v4()}`
    const newFile = await fileRepository.create({ internalPath, externalPath, encoding, mimetype, size, userId })

    return newFile
  }
}

export default buildUseCase({
  fileRepository: FileRepository
})
