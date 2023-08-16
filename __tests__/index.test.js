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

describe('GET /api/articles/:article_id', () => {
    test('GET: 200 returns the article id that is input into the endpoint', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {
            const article = response.body.article;
            expect(article.article_id).toEqual(1);
        })
    })
    test('GET: 200 returns the article id that is input into the endpoint', () => {
        return request(app)
        .get('/api/articles/5')
        .expect(200)
        .then((response) => {
            const article = response.body.article;
            expect(article.article_id).toEqual(5);
        })
    })
    test('GET: 200 responds by sending the article object back to the user according to the id on the endpoint', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {
            const article = response.body.article;
            expect(article).toMatchObject({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                votes: 100,
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              })
        })
    })
    test('GET: 200 responds by sending the article object back to the user according to another id on the endpoint', () => {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((response) => {
            const article = response.body.article;
            expect(article).toMatchObject({
                title: "Sony Vaio; or, The Laptop",
                topic: "mitch",
                author: "icellusedkars",
                body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
              })
        })
    })
    test('GET: 404 responds with resoucre not found when valid but non-existent id request input input to endpoint', () => {
        return request(app)
        .get('/api/articles/50')
        .expect(404)
        .then((response) => {
            const errorMessage = response.body.msg;
            expect(errorMessage).toBe('Resource not found');
        })
    })
})


describe('GET api/articles', () => {
    test('GET: 200 responds with an array of article objects withouot body property and including article_id property', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const {articles} = response.body;
            articles.forEach((article) => {
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)
                })
            })
        })
    })
    test('GET: 200 responds with an array of article objects including comment_count property', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const {articles} = response.body;
            articles.forEach((article) => {
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(String)
                })
            })
        })
    })
    test('GET: 200 responds with array of article objects in descending order of created_at', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            const {articles} = body;
            expect(articles).toBeSortedBy("created_at", { descending: true });
        })
    })
})

