import { ApolloServer, gql } from 'apollo-server';

import './client';

import { Author } from './models/Author';
import { Comment } from './models/Comment';

const typeDefs = gql`
  type Comment {
    id: ID
    text: String
    author: Author
  }

  type Author {
    id: ID
    name: String
    comments: [Comment]
  }

  type Query {
    author (id: ID): Author
    comment (id: ID): Comment
    comments (authorName: String): [Comment]
  }
`;

const resolvers = {
  Query: {
    author: (_, { id }) => Author.query().findById(id),
    comments: (_, { author }) => Comment.query().innerJoinRelation('author'),
    comment: (_, { id }) => Comment.query().findById(id),
  },
  Author: {
    comments: ({ id }) => Comment.query().where('author_id', '=', id),
  },
  Comment: {
    author: ({ author_id }) => Author.query().findById(author_id) 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(async ({ url }) => {
  console.log(`Server starts at ${url}`)
  // const a = await Comment.query().joinRelation('author')
  // const b = await Author.query().joinRelation('comments')
  console.log(Author, '------------', Comment)
});
