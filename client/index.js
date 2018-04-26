import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import SongCreate from "./src/components/SongCreate";
import SongList from "./src/components/SongList";
// import registerServiceWorker from './src/registerServiceWorker';

const client = new ApolloClient({
    link: new HttpLink(),
    cache: new InMemoryCache(),
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={SongList}/>
                <Route path='/song/new' component={SongCreate}/>
            </div>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
// registerServiceWorker();
