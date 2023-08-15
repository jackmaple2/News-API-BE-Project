const data = require('../db/data/test-data');
const db = require('../db/connection');
const app = require('../app');
const request = require('supertest');
const seed = require('../db/seeds/seed');
const { getTopics } = require('../db/controller/topic-controller');

afterAll(() => db.end());
beforeEach(() => seed(data));

describe('GET /api/topics', () => {
    test('GET: 200 sends an array of topics to our client', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            const result = response.body.topics;
            expect(result.length).toEqual(3);
            expect(result).toEqual(expect.any(Array));
            result.forEach((topic) => {
                expect(topic).toMatchObject({description: expect.any(String), slug: expect.any(String)})
            })
        })
    })
})

describe('GET /api', () => {
    test('GET: 200 sends a json object back with information on all endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const result = response.body;
            console.log(result);
            expect(result).toEqual({
                "GET /api": {
                  "description": "serves up a json representation of all the available endpoints of the api"
                },
                "GET /api/topics": {
                  "description": "serves an array of all topics",
                  "queries": [],
                  "exampleResponse": {
                    "topics": [{ "slug": "football", "description": "Footie!" }]
                  }
                },
                "GET /api/articles": {
                  "description": "serves an array of all articles",
                  "queries": ["author", "topic", "sort_by", "order"],
                  "exampleResponse": {
                    "articles": [
                      {
                        "title": "Seafood substitutions are increasing",
                        "topic": "cooking",
                        "author": "weegembump",
                        "body": "Text from the article..",
                        "created_at": "2018-05-30T15:59:13.341Z",
                        "votes": 0,
                        "comment_count": 6
                      }
                    ]
                  }
                }
              })
        })
    })
})