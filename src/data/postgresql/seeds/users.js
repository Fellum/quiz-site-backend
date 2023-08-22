export async function seed (knex) {
  const tableName = 'users'
  await knex(tableName).del()

  await knex(tableName).insert({
    username: 'dimas',
    email: 'email@tt.tt',
    passwordSalt: 'fbdb154ba585c34f73a3047278a5ef10',
    passwordHash: 'a1e033c242691a82cf23e16627ab37f30aee180cc960dfba08bd333fd04a0eed135f3656689f30e36c891425e873489bc95798ebaa81cc83a4be493245030bfe'
  })
}
