import _ from 'lodash'
import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  quizRepository
}) {
  return async (searchRequest) => {
    const {
      offset = 0,
      limit = 1000,
      ownerUserId
    } = searchRequest

    const query = _.omitBy({
      ownerUserId
    }, _.isUndefined)

    const [values, count] = await quizRepository.findAndCount(query, '*', { offset, limit })

    return { values, count }
  }
}

export default buildUseCase({
  quizRepository: QuizRepository
})
