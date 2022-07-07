import fs from 'fs'

import { ApolloServer } from 'apollo-server'

import type { ApolloServerExpressConfig } from 'apollo-server-express'

// NOTE: 仮のデータ
const links = [
  {
    id: 1,
    description: 'GraphQLチュートリアルをUdemyで学ぶ',
    url: 'https://sample.com'
  }
]

// リソルバ関数
const resolvers: ApolloServerExpressConfig['resolvers'] = {
  Query: {
    info: () => 'HackerNewsクローンlll',
    feed: () => links
  },
  Mutation: {
    post: (_, { description, url }) => {
      const link = {
        id: links.length + 1,
        description,
        url
      }

      links.push(link)

      return link
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('src/schemas/index.graphql', 'utf-8'),
  resolvers
})

server.listen().then(({ url }) => console.log(`\x1b[32m${url}\x1b[39m`))
