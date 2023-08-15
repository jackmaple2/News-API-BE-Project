const data = require('../db/data/test-data');
const db = require('../db/connection');
const app = require('../app');
const request = require('supertest');
const seed = require('../db/seeds/seed');
const { getTopics } = require('../db/controller/topic-controller');
const jsonEndpoints = require('../endpoints.json');

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
            expect(Object.keys(result[0])).toEqual(expect.arrayContaining([
                'description',
                'slug'
            ]))
        })
    })
})

describe('GET /api', () => {
    test('GET: 200 sends a json object back with information on all endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const endpoints = response.body;
            expect(endpoints).toEqual(jsonEndpoints);
        })
    })
})