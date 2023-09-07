import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async ({ text, answers, answerType, ord, quizId }) => {
    const newQuiz = await questionRepository.create({ text, answers, answerType, ord, quizId })

    return newQuiz
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
