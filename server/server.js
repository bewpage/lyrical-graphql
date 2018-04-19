const express = require('express');
const models = require('../../lyrical-graphql/server/models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('../../lyrical-graphql/server/schema/schema');
const MONGO_AUTH = require('./auth');

const app = express();

// Replace with your mongoLab URI
// const MONGO_URI = 'mongodb://lyrica-bew:sialababamak@ds151169.mlab.com:51169/lyricadb';
const MONGO_URI = MONGO_AUTH;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
