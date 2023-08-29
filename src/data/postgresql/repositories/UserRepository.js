import PostgresRepository from './PostgresRepository.js'

export default class UserRepository extends PostgresRepository {
  static tableName = 'users'
  static usernameEmailExists ({ username, email }) {
    // const knex = this.getKnex()
    // const usersQuery = this.getQueryBuilder()
    //   .select(1)
    //   .where({ email })
    //   .orWhere({ username })
    //   .limit(1)
    return this.getKnex()
      .select(this.views.withEmailExists(email))
      .select(this.views.withUsernameExists(username))
      // .select(knex.raw('exists(??) as exists', [usersQuery]))
      .first()
  }

  static views = {
    withEmailExists: email => {
      const usersQuery = this.getQueryBuilder()
        .select(1)
        .where({ email })
        .limit(1)
      return this.getKnex().raw('exists(??) as ??', [usersQuery, 'emailExists'])
    },
    withUsernameExists: username => {
      const usersQuery = this.getQueryBuilder()
        .select(1)
        .where({ username })
        .limit(1)
      return this.getKnex().raw('exists(??) as ??', [usersQuery, 'usernameExists'])
    }
  }
}
