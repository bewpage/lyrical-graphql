import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import SongCreate from "./src/components/SongCreate";
import SongList from "./src/components/SongList";
import SongDetail from "./src/components/SongDetail";
import './style/style.css';
// import registerServiceWorker from './src/registerServiceWorker';

const client = new ApolloClient({
    link: new HttpLink(),
    cache: new InMemoryCache({
        dataIdFromObject: o => o.id
    }),
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={SongList}/>
                    <Route exact path='/song/new' component={SongCreate}/>
                    <Route exact path='/song/:id' component={SongDetail}/>
                </Switch>
            </div>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
// registerServiceWorker();
