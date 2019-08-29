import { ApolloServer, AuthenticationError } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import * as jwt from 'jsonwebtoken';

import { merge } from 'lodash';

import { rootTypeDefs } from './resources/rootTypes';
import { userResolvers, userTypeDefs } from './resources/User/User.schema';

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, userTypeDefs],
  resolvers: merge(userResolvers),
});

const server = new ApolloServer({
  schema,
  mocks: false,
  debug: true,
  tracing: true,
  context: ({ req }) => {
    // Auth
    const noAuthEndpoints = [];
    const { operationName } = req.body;
    const { Authorization: token } = req.headers;

    let decodedToken = {};
    if (noAuthEndpoints.indexOf(operationName) === -1 && false) {
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
