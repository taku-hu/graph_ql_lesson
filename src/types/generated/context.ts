import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'

import { getUserId } from '@/utils/geuUserId'

export type Context = {
  prisma: PrismaClient
  req: ExpressContext['req']
  userId: ReturnType<typeof getUserId>
}
