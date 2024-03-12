import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  questionRepository
}) {
  return async ({ id, text, answerType, answers: rawAnswers, ord }) => {
    const answers = { value: rawAnswers || '' }

    const updatedQuiz = await questionRepository.updateById(id, {
      text, answerType, answers, ord
    })
    return updatedQuiz
  }
}

export default buildUseCase({
  questionRepository: QuestionRepository
})
