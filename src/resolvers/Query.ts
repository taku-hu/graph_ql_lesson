import { QueryResolvers } from '@/types/generated/graphql'

export const feed: QueryResolvers['feed'] = async (_, __, context) => await context.prisma.link.findMany()
