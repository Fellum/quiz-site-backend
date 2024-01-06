import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  quizRepository
}) {
  return async (userId, { id, title, description, ownerUserId, imageId }) => {
    const quiz = await quizRepository.findOne({ id })
    if (!quiz) throw new Error('Quiz not found')

    if (quiz.ownerUserId !== userId) throw new Error('Access error')

    const updatedQuiz = await quizRepository.updateById(id, { title, description, ownerUserId, imageId }, quizRepository.views.default())
    return updatedQuiz
  }
}

export default buildUseCase({
  quizRepository: QuizRepository
})
