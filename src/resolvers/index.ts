import * as Link from '@/resolvers/Link'
import * as Mutation from '@/resolvers/Mutation'
import * as Query from '@/resolvers/Query'
import * as User from '@/resolvers/User'
import { Resolvers } from '@/types/generated/graphql'

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Link,
  User
}
