import { LinkResolvers } from '@/types/generated/graphql'

export const postedBy: LinkResolvers['postedBy'] = async (parent, _, context) => {
  const postedUser = await context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()

  return postedUser && { ...postedUser, links: [] }
}
