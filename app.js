const express = require('express');
const app = express();
const {
    getTopics
} = require('./db/controller/topic-controller');
const {
    getArticles,
    getAllArticles
} = require('./db/controller/article-controller');
const {
    getCommentsByArticleId
} = require('./db/controller/comments-controller');
const { getEndpointInformation } = require('./db/controller/endpoints-controller');

app.use(express.json());
app.get('/api/topics', getTopics);
app.get('/api', getEndpointInformation);
app.get('/api/articles/:article_id', getArticles);
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.use((error, request, response, next) => {
    if (error.status && error.msg) {
        response.status(error.status).send({msg: error.msg});
    }
    next(error);
});

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Bad request' });
    } else res.status(500).send({ msg: 'Internal Server Error' });
  })


module.exports = app;