import fs from 'fs'

import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'

import { resolvers } from '@/resolvers'
import { getUserId } from '@/utils/geuUserId'

const prisma = new PrismaClient()
const server = new ApolloServer({
  typeDefs: fs.readFileSync('src/schemas/index.graphql', 'utf-8'),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    userId: req.headers.authorization ? getUserId(req) : null
  })
})

server.listen().then(({ url }) => console.log(`\x1b[32m${url}\x1b[39m`))
