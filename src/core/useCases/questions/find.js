import _ from 'lodash'
import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async (searchRequest) => {
    const {
      offset = 0,
      limit = 1000,
      filter: {
        quizId
      }
    } = searchRequest

    const query = _.omitBy({
      quizId
    }, _.isUndefined)

    const [values, count] = await questionRepository.findAndCount(query, '*', { offset, limit })

    return { values, count }
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
