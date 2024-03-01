import _ from 'lodash'

import QuizRepository from '../../../data/postgresql/repositories/QuizRepository.js'
import QuestionRepository from '../../../data/postgresql/repositories/QuestionRepository.js'

export function buildUseCase ({
  quizRepository,
  questionRepository
}) {
  return async (quizId, answers) => {
    const quiz = await quizRepository.findOne({ id: quizId })
    if (!quiz) throw new Error('Quiz not found')

    const questions = await questionRepository.find({ quizId })
    const answersByQuestionId = _.keyBy(answers, 'questionId')

    const validatedAnswers = _.map(questions, (question) => {
      const userAnswer = answersByQuestionId[question.id]
      if (!userAnswer) {
        return {
          questionId: question.id, correct: false
        }
      }
      const validatedAnswer = (() => {
        switch (question.answerType) {
          case 'single': {
            const correctAnswer = _.find(question.answers.value, { correct: true })
            return { questionId: question.id, correct: correctAnswer.value === userAnswer.value }
          }
          case 'plural': {
            const correctAnswers = _(question.answers.value)
              .filter({ correct: true })
              .map('value')
              .sort()
              .value()
            return { questionId: question.id, correct: _.isEqual(correctAnswers, userAnswer.value.sort()) }
          }
          default:
        }
      })()
      return validatedAnswer
    })
    const score = _.filter(validatedAnswers, { correct: true }).length
    const maxScore = questions.length
    return { validatedAnswers, score, maxScore }
  }
}

export default buildUseCase({
  quizRepository: QuizRepository,
  questionRepository: QuestionRepository
})
