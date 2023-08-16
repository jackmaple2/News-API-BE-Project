const express = require('express');
const app = express();
const {
    getTopics
} = require('./db/controller/topic-controller');
const {
    getArticles
} = require('./db/controller/article-controller');
const { getEndpointInformation } = require('./db/controller/endpoints-controller');

app.get('/api/topics', getTopics);
app.get('/api', getEndpointInformation);
app.get('/api/articles/:article_id', getArticles);

app.use((error, request, response, next) => {
    if (error.status && error.msg) {
        response.status(error.status).send({msg: error.msg});
    }
    next(error);
});
app.use((error, request, response, next) => {
    if (error.code === '22P02') {
      response.status(400).send({ msg: 'Bad Request' });
    } else response.status(500).send({ msg: 'Internal Server Error' });
  });


module.exports = app;