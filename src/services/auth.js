import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { readFileSync } from 'fs'

const keys = {
  ACCESS: {
    private: readFileSync('keys/authAccessPrivate.key'),
    public: readFileSync('keys/authAccessPublic.key')
  },
  REFRESH: {
    private: readFileSync('keys/authRefreshPrivate.key'),
    public: readFileSync('keys/authRefreshPublic.key')
  }
}

function getKeyByKeyType (keyType) {
  const key = keys[keyType]
  if (!keyType || !key) {
    throw new Error('Invalid keyType')
  }
  return key
}

export function jwtVerify (token, { keyType = 'ACCESS', ...otherOptions } = {}) {
  const key = getKeyByKeyType(keyType)
  return jwt.verify(token, key.public, {
    algorithm: 'RS256',
    ...otherOptions
  })
}

export function jwtSign (payload, options = { keyType: 'ACCESS' }) {
  const { keyType } = options
  const key = getKeyByKeyType(keyType)
  return jwt.sign(payload, key.private, {
    expiresIn: 60 * 5,
    algorithm: 'RS256'
  })
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
