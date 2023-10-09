const data = require('../db/data/test-data');
const db = require('../db/connection');
const app = require('../app');
const request = require('supertest');
const seed = require('../db/seeds/seed');
const { getTopics } = require('../db/controller/topic-controller');
const jsonEndpoints = require('../endpoints.json');
const { expect } = require('@jest/globals');

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
    test('GET: 404 responds with resource not found when valid but non-existent id request input input to endpoint', () => {
        return request(app)
        .get('/api/articles/50')
        .expect(404)
        .then((response) => {
            const errorMessage = response.body.msg;
            expect(errorMessage).toBe('Resource not found');
        })
    })
    test('GET: 400 responds with resoucre not found when invalid request input input to endpoint', () => {
        return request(app)
        .get('/api/articles/banana')
        .expect(400)
        .then((response) => {
            const errorMessage = response.body.msg;
            expect(errorMessage).toBe('Bad request');
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

describe('GET /api/articles/:article_id/comments', () => {
    test('GET: 200 repsonds with an array of all comments with all 6 properties required', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
            const {comments} = body;
            expect(body.length > 0)
            comments.forEach((comment) => {
                expect(comment.length >0);
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number),
                })
            })
        })
    })
    test('GET: 200 repsonds with an array of all comments for an article_id specified on the endpoint', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
            const {comments} = body;
            expect(comments.length > 0)
            comments.forEach((comment) => {
                expect(comment.length > 0);
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: expect.any(Number),
                })
                expect(comment.article_id).toBe(1);
            })
        })
    })
    test('GET: 200 repsonds with an array of all comments for an article_id specified on the endpoint, returned in order with most recent first', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body}) => {
            const {comments} = body;
            expect(comments).toBeSortedBy('created_at', {descending: true});
        })   
    })
    test('GET: 200 repsonds with an empty array when the article_id comments specified on the endpoint are empty', () => {
        return request(app)
        .get('/api/articles/13/comments')
        .expect(200)
        .then(({body}) => {
            const {comments} = body;
            expect(comments.length).toEqual(0);
            expect(comments).toEqual([]);
        })   
    })
    test('GET: 404 repsonds with an error message resource not found, when invalid id request made on the endpoint', () => {
        return request(app)
        .get('/api/articles/100/comments')
        .expect(404)
        .then(({body}) => {
            const {msg} = body;
            expect(msg).toBe('Resource not found');
        })
    })
    test('GET: 400 repsonds with an error message bad request, when bad request made on the endpoint', () => {
        return request(app)
        .get('/api/articles/hello/comments')
        .expect(400)
        .then(({body}) => {
            const {msg} = body;
            expect(msg).toBe('Bad request');
        })
    })
})


describe('POST /api/articles/:article_id/comments', () => {
    test('POST: 201 responds with a new comment added for an article with article_id specified in endpoint', () => {
        const newComment = {
            username: 'icellusedkars',
            body: 'This is a new comment',
          };
        return request(app)
        .post('/api/articles/3/comments')
        .send(newComment)
        .expect(201)
        .then(({body}) => {
            const {comment} = body;
            expect(comment).toMatchObject(
                {
                    author: 'icellusedkars',
                    body: 'This is a new comment'
                  }
            )
        })
    })
    test('POST: 201 responds with a new comment with author and body properties present even if i send more properties to endpoint than i need', () => {
        const newComment = {
            username: 'icellusedkars',
            body: 'This is a new comment',
            extra: 'This is a new property',
            category: 'Category property'
          };
        return request(app)
        .post('/api/articles/3/comments')
        .send(newComment)
        .expect(201)
        .then(({body}) => {
            const {comment} = body;
            expect(comment).toMatchObject(
                {
                    author: 'icellusedkars',
                    body: 'This is a new comment',
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String)
                  }
            )
        })
    })
    test('POST: 400 responds with bad request when bad id request made to endpoint', () => {
        const newComment = {
            username: 'icellusedkars',
            body: 'This is a new comment',
          };
        return request(app)
        .post('/api/articles/not-a-number/comments')
        .send(newComment)
        .expect(400)
        .then(({body}) => {
            const {msg} = body;
            expect(msg).toBe('Bad request')
        })
    })
    test('POST: 404 responds with resource not found when id request on endpoint does not exist', () => {
        const newComment = {
            username: 'icellusedkars',
            body: 'This is a new comment',
          };
        return request(app)
        .post('/api/articles/99999/comments')
        .send(newComment)
        .expect(404)
        .then(({body}) => {
            const {msg} = body;
            expect(msg).toBe('Resource not found')
        })
    })

})


describe('PATCH /api/articles/:article_id', () => {
    test('PATCH: 200 responds with the votes property updated in the response when votes = 0', () => {
        return request(app)
        .patch('/api/articles/3')
        .send({inc_votes: 10})
        .then(({body}) => {
            const {article} = body;
            expect(article).toMatchObject({
                title: "Eight pug gifs that remind me of mitch",
                topic: "mitch",
                author: "icellusedkars",
                body: "some gifs",
                votes: 10,
                article_id: 3,
                created_at: expect.any(String)
            })
        })
    })
})

describe.only('DELETE /api/comments/:comment_id', () => {
    test('DELETE 204: should delete the comment according to the comment_id in the endpoint request', () => {
        return request(app).delete('/api/comments/1').expect(204)
        .then(() =>{
            return db.query(`SELECT * FROM comments WHERE comment_id = 1`)
        })
        .then(({rows}) => {
            expect(rows.length).toBe(0)
        })
    })
    test('DELETE 404: should respond with a 404 error for a valid but non-existent comment_id', () => {
        return request(app).delete('/api/comments/999').expect(404)
        .then(({body})=>{
            const {msg} = body
            expect(msg).toEqual('Resource not found')
        })
    })
    test('DELETE 400: should response with a 400 if the comment is not valid', () => {
        return request(app).delete('/api/comments/banana').expect(400)
        .then(({body}) => {
            const {msg} = body
            expect(msg).toEqual('Bad request')
        })
    })
})


// describe('PATCH /api/articles/:article_id', () => {
//     test('PATCH: 200 responds with the votes property updated in the response when votes = 0', () => {
//         return request(app)
//         .patch('/api/articles/3')
//         .send({inc_votes: 10})
//         .then(({body}) => {
//             const {comment} = body;
//             expect(comment).toMatchObject({
//                 body: expect.any(String),
//                 votes: 10,
//                 author: expect.any(String),
//                 article_id: 3,
//                 created_at: expect.any(String)
//             })
//         })
//     })
//     test('PATCH: 200 responds with the votes property updated in the response when votes already equals more than 0', () => {
//         return request(app)
//         .patch('/api/articles/9')
//         .send({inc_votes: 10})
//         .then(({body}) => {
//             const {comment} = body;
//             expect(comment).toMatchObject({
//                 body: expect.any(String),
//                 votes: 26,
//                 author: expect.any(String),
//                 article_id: 9,
//                 created_at: expect.any(String),
//               })
//         })
//     })
//     test('PATCH: 200 responds with the votes property updated in the response when votes inc_votes has a minus value', () => {
//         return request(app)
//         .patch('/api/articles/9')
//         .send({inc_votes: -10})
//         .then(({body}) => {
//             const {comment} = body;
//             expect(comment).toMatchObject({
//                 body: expect.any(String),
//                 votes: 6,
//                 author: expect.any(String),
//                 article_id: 9,
//                 created_at: expect.any(String),
//               })
//         })
//     })
//     test('PATCH: 400 responds with bad request when invalid request to the endpoint made', () => {
//         return request(app)
//         .patch('/api/articles/not-a-number')
//         .send({inc_votes: 10})
//         .then(({body}) => {
//             const {msg} = body;
//             expect(msg).toBe('Bad request')
//         })
//     })
//     test('PATCH: 404 responds with resource not found when valid but non-existent request made to the endpoint', () => {
//         return request(app)
//         .patch('/api/articles/999999')
//         .send({inc_votes: 10})
//         .then(({body}) => {
//             const {msg} = body;
//             expect(msg).toBe('Resource not found')
//         })
//     })
//     test('PATCH: 400 responds with bad request when an invalid inc_votes value is sent', () => {
//         return request(app)
//         .patch('/api/articles/9')
//         .send({inc_votes: 'ten'})
//         .then(({body}) => {
//             const {msg} = body;
//             expect(msg).toBe('Bad request')
//         })
//     })
// })