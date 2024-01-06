import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  quizRepository
}) {
  return async ({ title, description, ownerUserId, imageId }) => {
    const newQuiz = await quizRepository.create({ title, description, ownerUserId, imageId }, quizRepository.views.default())
    return newQuiz
  }
}

export default buildUseCase({
  quizRepository: QuizRepository
})
