// @ts-check
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:4000/graphql';

const ExampleQuery = gql`
  fragment ExampleFragment on ExampleInterface {
    __typename
    id
    name
  }

  query {
    exampleQuery {
      ...ExampleFragment
    }
  }
`;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
});

function GQLComponent() {
  const { error, data } = useQuery(ExampleQuery);

  if (error) {
    console.log({ error });
    return 'Error. See console.';
  }

  return data ? <pre>{ JSON.stringify( data?.exampleQuery ) }</pre> : '';
}

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Data missing reproduction</h1>
      <GQLComponent />
    </ApolloProvider>
  );
}

export default App;