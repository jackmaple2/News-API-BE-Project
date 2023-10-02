const express = require('express');
const app = express();

const cors = require('cors');

const {
    getTopics
} = require('./db/controller/topic-controller');
const {
    getArticleById,
    getAllArticles,
    patchVotesInArticle
} = require('./db/controller/article-controller');
const {
    getCommentsByArticleId,
    postComment
} = require('./db/controller/comments-controller');

const {getUsers} = require('./db/controller/users-controller')

const { getEndpointInformation } = require('./db/controller/endpoints-controller');

app.use(cors());

app.use(express.json());

app.get('/api', getEndpointInformation);

app.get('/api/topics', getTopics);

app.get('/api/articles', getAllArticles);
app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchVotesInArticle);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.post('/api/articles/:article_id/comments', postComment);

app.get('/api/users', getUsers);

app.use((error, request, response, next) => {
    if (error.status && error.msg) {
        response.status(error.status).send({msg: error.msg});
    }
    next(error);
});

app.use((error, request, response, next) => {
    if (error.code === '22P02') {
      response.status(400).send({ msg: 'Bad request' });
    } else response.status(500).send({ msg: 'Internal Server Error' });
  })


module.exports = app;