import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'

export function buildUseCase ({
  quizRepository
}) {
  return async ({ title, description, ownerUserId }) => {
    const newQuiz = await quizRepository.create({ title, description, ownerUserId })
    return newQuiz
  }
}

export default buildUseCase({
  quizRepository: QuizRepository
})
