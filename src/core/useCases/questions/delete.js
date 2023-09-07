import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async questionId => {
    const question = await questionRepository.findOne({ id: questionId })
    if (!question) throw new Error('Question not found')

    await questionRepository.deleteById(questionId)
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
