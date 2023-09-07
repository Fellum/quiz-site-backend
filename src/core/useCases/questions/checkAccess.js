import _ from 'lodash'
import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'
import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  questionRepository,
  quizRepository
}) {
  return async ({ quizId, questionId, userId }) => {
    const foundValue = questionId
      ? await questionRepository.findOne({ id: questionId }, [
        QuestionRepository.views.withUserOwnerId()
      ])
      : await quizRepository.findOne({ id: quizId }, 'ownerUserId')
    if (!foundValue) {
      throw new Error('Not found')
    }
    const { ownerUserId } = foundValue
    if (ownerUserId !== userId) {
      throw new Error('Access error')
    }
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository,
  quizRepository: QuizRepository
})
