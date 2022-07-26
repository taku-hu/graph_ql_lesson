import { UserResolvers } from '@/types/generated/graphql'

export const links: UserResolvers['links'] = async (parent, _, context) => {
  const postedLinks = await context.prisma.user.findUnique({ where: { id: parent.id } }).links()

  return postedLinks
}
