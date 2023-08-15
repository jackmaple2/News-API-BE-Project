const express = require('express');
const app = express();
const {
    getTopics
} = require('./db/controller/topic-controller');
const { getEndpointInformation } = require('./db/controller/endpoints-controller');

app.use(express.json());
app.get('/api/topics', getTopics);
app.get('/api', getEndpointInformation);


module.exports = app;