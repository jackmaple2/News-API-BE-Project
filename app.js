const express = require('express');
const app = express();
const fs = require('fs')
const {
    getTopics
} = require('./db/controller/topic-controller');

app.use(express.json());
app.get('/api/topics', getTopics);
app.get('/api', (request, response) => {
    const endpoints = JSON.parse(fs.readFileSync('./endpoints.json', 'utf8'));
    response.json(endpoints);
})


module.exports = app;