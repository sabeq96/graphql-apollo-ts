import { ApolloServer, AuthenticationError } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import * as jwt from 'jsonwebtoken';

import { merge } from 'lodash';

import { rootTypeDefs } from './resources/rootTypes';
import { authorResolvers, authorTypeDefs } from './resources/Author/Author.schema';
import { commentResolvers, commentTypeDefs } from './resources/Comment/Comment.schema';

// start mongoose
import './client';

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, authorTypeDefs, commentTypeDefs],
  resolvers: merge(authorResolvers, commentResolvers),
});

const server = new ApolloServer({
  schema,
  mocks: false,
  debug: true,
  tracing: true,
  context: ({ req }) => {
    // Auth
    const noAuthEndpoints = ['createAuthor', 'login', 'authors'];
    const { operationName } = req.body;
    const { Authorization: token } = req.headers;

    let decodedToken = {};
    if (noAuthEndpoints.indexOf(operationName) === -1) {
      try {
        decodedToken = jwt.verify(token, '1234');
      } catch {
        throw new AuthenticationError('Aaaa, takiego wała, spierdalaj')
      }
    }

    return { token: decodedToken }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
