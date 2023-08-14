const express = require('express');
const app = express();
const fs = require('fs')
const {
    getTopics
} = require('./db/controller/topic-controller');

app.use(express.json());
app.get('/api/topics', getTopics);
app.get('/api', (request, response) => {
        fs.readFile('./endpoints.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            } else {
                console.log(response)
                response.send(JSON.parse(data));
            }
        })
    }
)


module.exports = app;