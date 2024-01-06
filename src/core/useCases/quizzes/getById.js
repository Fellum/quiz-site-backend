import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  quizRepository
}) {
  return async (quizId) => {
    const foundQuiz = await quizRepository.findOne({ id: quizId }, quizRepository.views.default())
    if (!foundQuiz) throw new Error('Quiz not found')

    return foundQuiz
  }
}

export default buildUseCase({
  quizRepository: QuizRepository
})
