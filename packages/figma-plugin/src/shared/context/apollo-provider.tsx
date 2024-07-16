import {
  ApolloClient,
  ApolloProvider as Provider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import React, { ReactNode } from 'react'
import { setContext } from '@apollo/client/link/context'

const API = 'https://project.flexcodelabs.tld/graphql'

const createApolloClient = (token: any) => {
  const httpLink = createHttpLink({
    uri: API,
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

const ApolloProvider = ({ children }: { children: ReactNode }) => {
  //TODO: Create a global state to manage token and pass it here
  const client = createApolloClient('')

  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
