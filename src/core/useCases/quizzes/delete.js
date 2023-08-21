import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  quizRepository
}) {
  return async (userId, quizId) => {
    const quiz = await quizRepository.findOne({ id: quizId })
    if (!quiz) throw new Error('Quiz not found')

    if (quiz.ownerUserId !== userId) throw new Error('Access error')

    await quizRepository.deleteById(quizId)
  }
}

export default buildUseCase({
  quizRepository: QuizRepository
})
