import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { MutationResolvers } from '@/types/generated/graphql'

export const signup: MutationResolvers['signup'] = async (_, args, context) => {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.user.create({
    data: {
      ...args,
      password
    }
  })

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!)

  return {
    // FIXME: 型エラーの解消方法これで正しいのか
    user: { ...user, links: [] },
    token
  }
}

export const login: MutationResolvers['login'] = async (_, { email, password }, context) => {
  const user = await context.prisma.user.findUnique({
    where: { email }
  })

  const valid = await bcrypt.compare(password, user?.password ?? '')
  if (!user || !valid) {
    throw new Error('ユーザーまたはパスワードが無効です')
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET!)

  return {
    // FIXME: 型エラーの解消方法これで正しいのか
    user: { ...user, links: [] },
    token
  }
}

export const post: MutationResolvers['post'] = async (_, { url, description }, context) => {
  const newPost = await context.prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: context.userId } }
    }
  })

  return newPost
}
