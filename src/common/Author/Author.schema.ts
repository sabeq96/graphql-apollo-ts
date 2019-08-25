import { Author } from './Author.model';
import { Comment } from '../Comment/Comment.model';

const authorTypeDefs = `
  type Author {
    id: ID
    name: String
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  input AuthorInput {
    name: String
  }

  extend type Query {
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