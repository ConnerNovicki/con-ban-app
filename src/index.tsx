import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    // uri: "https://con-ban-api.herokuapp.com/"
    uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('xtoken')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
  });

const resolvers = {
    Mutation: {
        saveUser: (_root, { user }, { cache, getCacheKey }) => {
            cache.writeData({ data: { user } })
        }
    }
}

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    resolvers
});

const ProvidedApp = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(<ProvidedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
