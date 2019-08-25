import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { rootTypeDefs } from './common/rootTypes';
import { authorResolvers, authorTypeDefs } from './common/Author/Author.schema';
import { commentResolvers, commentTypeDefs } from './common/Comment/Comment.schema';

import './client';

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, authorTypeDefs, commentTypeDefs],
  resolvers: merge(authorResolvers, commentResolvers),
});

const server = new ApolloServer({
  schema,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
