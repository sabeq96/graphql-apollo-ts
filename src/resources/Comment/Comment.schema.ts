import { Comment } from './Comment.model';
import { Author } from '../Author/Author.model';

const commentTypeDefs = `
  type Comment {
    id: ID
    text: String
    author: Author
    createdAt: String
    updatedAt: String
  }

  input CommentInput {
    text: String
  }

  extend type Query {
    comment (id: ID): Comment
    comments (input: CommentInput): [Comment]
  }

  extend type Mutation {
    createComment(text: String, authorId: ID!): Comment
    removeComment(id: ID!): Comment
  }
`;

const commentResolvers = {
  Query: {
    comment: (_, { id }) => Comment.findById(id),
    comments: (_, { text }) => Comment.find().exec(),
  },
  Mutation: {
    createComment: (_, { text, authorId }) => Comment.create({ text, authorId }),
    removeComment: (_, { id }) => Comment.deleteOne({ _id: id }).exec(),
  },
  Comment: {
    author: (comment) => Author.findById(comment.authorId).exec(),
  }
}

export {
  commentTypeDefs,
  commentResolvers,
}