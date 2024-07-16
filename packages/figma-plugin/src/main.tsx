import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import ApolloProvider from './shared/context/apollo-provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
