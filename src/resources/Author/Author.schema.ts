import { Author } from './Author.model';
import { Comment } from '../Comment/Comment.model';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const authorTypeDefs = `
  type Author {
    id: ID
    name: String
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  type Login {
    token: String
  }

  input AuthorInput {
    name: String
  }

  extend type Query {
    login (name: String!): Login
    author (id: ID!): Author
    authors (input: AuthorInput): [Author]
  }

  extend type Mutation {
    createAuthor (name: String): Author
    removeAuthor (id: ID!): Author
  }
`;

const authorResolvers = {
  Query: {
    login: async (_, { name }) => {
      const author = await Author.findOne({ name }).exec();
      let token: String = '';
      if (author) {
        token = jwt.sign({ id: author.id, expiresIn: '1h' }, '1234')
      } else {
        throw new AuthenticationError('Aaaa, takiego wała, spierdalaj')
      }

      return { token };
    },
    author: (_, { id }) => Author.findById(id).exec(),
    authors: (_, { id }) => Author.find().exec(),
  },
  Mutation: {
    createAuthor: (_, { name }) => Author.create({ name }),
    removeAuthor: async (_, { id }) => {
      const author = await Author.findById(id);
      return author.remove()
    },
  },
  Author: {
    comments: (author) => Comment.find({ authorId: author.id }).exec(),
  },
}

export {
  authorTypeDefs,
  authorResolvers,
}