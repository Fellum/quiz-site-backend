import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  quizRepository
}) {
  return async (searchRequest) => {
    const {
      offset = 0,
      limit = 1000
    } = searchRequest

    const [values, count] = await quizRepository.findAndCount({}, '*', { offset, limit })

    return { values, count }
  }
}

export default buildUseCase({
  quizRepository: QuizRepository
})
