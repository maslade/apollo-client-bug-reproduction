1. Run `npm install && npm start`
2. Load the web page in your browser. It will run at `http://localhost:8080` by default.

### Expected behavior

I see one item of type `ExampleInterface`, including its typename, ID, and name. When I immediately
log the results of `useQuery`, they match what I see in the network tab. It looks like this:

```json
{
  "__typename": "ExampleTypeB",
  "id": "1",
  "name": "Example Name"
}
```

### Actual behavior

I see one item with only a `__typename` field.

### Background

This occurs when querying for an interface using a fragment.

I can work around it by not (A) using fragments or (B) using a fragment for each subtype. Both
options are problematic.

#### Workaround A

```graphql
  const ExampleQuery = gql`
    query {
      exampleQuery {
        __typename
        id
        name
      }
    }
  `;
```

#### Workaround B

```graphql
  const ExampleQuery = gql`
    fragment ExampleFragmentA on ExampleTypeA {
      __typename
      id
      name
    }

    fragment ExampleFragmentB on ExampleTypeB {
      __typename
      id
      name
    }

    query {
      exampleQuery {
        __typename
        ...ExampleFragmentA
        ...ExampleFragmentB
      }
    }
  `;
```