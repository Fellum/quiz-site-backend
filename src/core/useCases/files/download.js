import FileRepository from '../../../data/postgresql/repositories/FileRepository.js'

export function buildUseCase ({
  fileRepository
}) {
  return async ({ externalPath, userId }) => {
    console.log(externalPath)
    const foundFile = await fileRepository.findOne({ externalPath })
    console.log(foundFile)

    return foundFile
  }
}

export default buildUseCase({
  fileRepository: FileRepository
})
