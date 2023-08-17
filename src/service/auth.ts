import jwt_decode from 'jwt-decode'
import storageService from './storage'
import Config from '@/constant/config'

interface JwtBody {
  sub: string
  auth: string
  fullName: string
  exp: number
}

export function decodeJwt(token: string): JwtBody | null {
  if (!token) return null
  return jwt_decode(token)
}
export function getUsername(token: string) {
  const data = decodeJwt(token)
  return !!data ? data.sub : null
}

export function hasRole(...roles: string[]): boolean {
  const token = storageService.getItem(Config.ACCESS_TOKEN)
  if (!token) {
    return false
  }
  const body = decodeJwt(token)
  const auth = body?.auth.split(',')
  return auth ? auth.some(val => roles.includes(val)) : false
}