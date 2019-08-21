import { ApolloServer, gql } from 'apollo-server'
import { find, filter } from 'lodash';

interface Author { id: string, name: string };
const authorList: Author[] = [{ id: '1', name: 'Shakespear' }]

interface Comment {id: string, name: string, author: string };
const commentList: Comment[] = [{ id: '1', name: 'Lorem ipsum es numero uno', author: '1' }]

const typeDefs = gql`
  type Comment {
    id: ID
    name: String
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
    comments (author: ID): [Comment]
  }
`;

const resolvers = {
  Query: {
    author: (_, { id }) => find(authorList, { id }),
    comments: (_, { author }) => filter(commentList, { author }),
    comment: (_, { id }) => find(commentList, { id }),
  },
  Author: {
    comments: (author) => filter(commentList, { author: author.id })
  },
  Comment: {
    author: (comment) => find(authorList, { id: comment.author })
  } 
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
