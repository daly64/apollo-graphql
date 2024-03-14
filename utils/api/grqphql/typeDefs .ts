import { gql } from "@apollo/client";

const typeDefs = gql`
  type User {
    id: ID
    name: String!
    score: Int
  }
  input UserInput {
    name: String
    score: Int
  }

  type Query {
    hello: String
    getAllUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }

  type Subscription {
    getAllUsers: [User]
    getUser(id: ID!): User
  }
`;

export default typeDefs;
