const express = require('express');
const app = express();
const {
    getTopics
} = require('./db/controller/topic-controller');
const {
    getArticles
} = require('./db/controller/article-controller');
const { getEndpointInformation } = require('./db/controller/endpoints-controller');

app.use(express.json());
app.get('/api/topics', getTopics);
app.get('/api', getEndpointInformation);
app.get('/api/articles/:article_id', getArticles);

app.use((error, request, response, next) => {
    if (error.status && error.msg) {
        response.status(error.status).send({msg: error.msg});
    }
}) 


module.exports = app;