import _ from 'lodash'
import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async ({ text, answers, answerType, ord, quizId }) => {
    const preparedAnswers = { value: answers || '' }
    const newQuiz = await questionRepository.create({ text, preparedAnswers, answerType, ord, quizId })

    return newQuiz
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
