import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async (userId, { id, title, description, ownerUserId }) => {
    const quiz = await questionRepository.findOne({ id })
    if (!quiz) throw new Error('Quiz not found')

    if (quiz.ownerUserId !== userId) throw new Error('Access error')

    const updatedQuiz = await questionRepository.updateById(id, { title, description, ownerUserId })
    return updatedQuiz
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
