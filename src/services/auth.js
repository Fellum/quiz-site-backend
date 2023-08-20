import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { readFileSync } from 'fs'

const authPrivate = readFileSync('keys/authPrivate.key')
const authPublic = readFileSync('keys/authPublic.key')

export function jwtVerify (token, options = {}) {
  return jwt.verify(token, authPublic, {
    algorithm: 'RS256',
    ...options
  })
}

export function jwtSign (payload) {
  return jwt.sign(payload, authPrivate, {
    expiresIn: 60 * 5,
    algorithm: 'RS256'
  })
}

export function jwtCreateRefreshToken () {
  return crypto.randomBytes(16).toString('hex')
}

export function passwordHash (password) {
  const passwordSalt = crypto.randomBytes(16).toString('hex')

  const passwordHash = crypto.pbkdf2Sync(password, passwordSalt,
    1000, 64, 'sha512').toString('hex')

  return { passwordSalt, passwordHash }
}

export function passwordVerify (password, passwordHash, passwordSalt) {
  const hash = crypto.pbkdf2Sync(password,
    passwordSalt, 1000, 64, 'sha512').toString('hex')
  return passwordHash === hash
}
