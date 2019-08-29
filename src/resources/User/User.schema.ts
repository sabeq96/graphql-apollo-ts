import { User } from './User.model';
import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

const userTypeDefs = `
  input UserInput {
    first_name: String
    last_name: String
    email: String
    password: String
    avatar: String
    is_payed_user: Boolean
  }

  input UserFilter {
    first_name: String
  }

  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String!
    password: String
    avatar: String
    is_payed_user: Boolean
    created_at: String
    updated_at: String
  }

  type Login {
    token: String
  }

  extend type Query {
    login(first_name: String!): Login
    user(id: ID!): User
    users(filter: UserFilter!, offset: Int, limit: Int): [User]
    usersAll: [User]
  }

  extend type Mutation {
    createUser (props: UserInput!): User
    updateUser(id: ID!, props: UserInput!): Boolean
    removeUser (id: ID!): Boolean
  }
`;

const userResolvers = {
  Query: {
    login: async (_, { first_name }) => {
      const user = await User.findOne({ first_name });
      let token = '';
      if (user) {
        token = jwt.sign({ id: user.id, expiresIn: '1h' }, '1234')
      } else {
        throw new AuthenticationError('Aaaa, takiego wała, spierdalaj')
      }

      return { token };
    },
    user: (_, { id }) => User.findById(id),
    users: (_, { filter, offset, limit }) => User.find(filter, offset, limit),
    usersAll: () => User.findAll(),
  },
  Mutation: {
    createUser: (_, { props }) => User.create(props),
    updateUser: (_, { id, props }) => User.update(id, props),
    removeUser: (_, { id }) => User.destroy(id)
  },
}

export {
  userTypeDefs,
  userResolvers,
}