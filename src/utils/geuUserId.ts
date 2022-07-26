import { ExpressContext } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

const getTokenPayload = (token: string) => jwt.verify(token, process.env.APP_SECRET!)

export const getUserId = (req?: ExpressContext['req'], authToken?: string) => {
  if (req) {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.replace('Bearer', '')
      if (!token) {
        throw new Error('トークンが見つかりませんでした')
      }
      const tokenPayload = getTokenPayload(token)

      return typeof tokenPayload === 'string' ? tokenPayload : tokenPayload.userId
    }
  }

  if (authToken) {
    const tokenPayload = getTokenPayload(authToken)

    return typeof tokenPayload === 'string' ? tokenPayload : tokenPayload.userId
  }

  throw new Error('認証権限がありません')
}
