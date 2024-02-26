const { ApolloServer, gql } = require('apollo-server');

const server = new ApolloServer({
  typeDefs: gql`
    interface ExampleInterface {
      id: ID!
      name: String!
    }

    type ExampleTypeA implements ExampleInterface {
      id: ID!
      name: String!
    }

    type ExampleTypeB implements ExampleInterface {
      id: ID!
      name: String!
    }

    type Query {
      exampleQuery: ExampleInterface!
    }
  `,
  resolvers: {
    ExampleInterface: {
      __resolveType: (obj) => {
        return Math.random() > 0.5 ? 'ExampleTypeA' : 'ExampleTypeB';
      }
    },
    Query: {
      exampleQuery: () => ({
        id: 1,
        name: 'Example Name',
        extraField1: 'Example Extra Field 1'
      })
    },
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});