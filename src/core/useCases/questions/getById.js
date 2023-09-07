import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async (quizId) => {
    const foundQuiz = await questionRepository.findOne({ id: quizId })
    if (!foundQuiz) throw new Error('Quiz not found')

    return foundQuiz
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
