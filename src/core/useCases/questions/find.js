import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async (searchRequest) => {
    const {
      offset = 0,
      limit = 1000
    } = searchRequest

    const [values, count] = await questionRepository.findAndCount({}, '*', { offset, limit })

    return { values, count }
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
