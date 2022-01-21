const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');
beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET WELCOME MESSAGE', () => {
	test('responds with message all ok', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual({ message: 'all ok' });
			});
	});
});

describe('GET TOPICS', () => {
	test('Responds with a list of topics', () => {
		return request(app)
			.get('/api/topics')
			.expect(200)
			.then((res) => {
				expect(res.body.result).toHaveLength(3);
				res.body.result.forEach((topic) => {
					expect(topic).toEqual(
						expect.objectContaining({
							description: expect.any(String),
							slug: expect.any(String),
						})
					);
				});
			});
	});
});

describe('GET ARTICLE ID', () => {
	test('Responds with an article object with properties', () => {
		return request(app)
			.get('/api/article/1')
			.expect(200)
			.then((res) => {
				expect(typeof res.body).toBe('object');

				expect(res.body).toMatchObject({
					article: {
						article_id: 1,
						title: 'Living in the shadow of a great man',
						body: 'I find this existence challenging',
						votes: 100,
						topic: 'mitch',
						author: 'butter_bridge',
						created_at: '2020-07-09T20:11:00.000Z',
						comment_count: '11',
					},
				});
			});
	});
});

describe('DELETE COMMENT BY ID', () => {
	test('Deletes a specified comment from the user', () => {
		return request(app).delete('/api/comments/1').expect(204);
	});
});

describe('POST COMMENT', () => {
	test('Responds with the posted comment', () => {
		return request(app).post('/api/articles/1/comments');
	});
});

describe('GET API', () => {
	test('Gets the API endpoint information', () => {
		return request(app).get('/api/');
	});
});

describe('PATCH ARTICLE', () => {
	test('Responds with the updated article and vote count', () => {
		const newObj = { inc_votes: 3 };
		return request(app)
			.patch('/api/articles/1')
			.send(newObj)
			.expect(200)
			.then((res) => {
				expect(typeof res.body).toBe('object');
				expect(res.body).toMatchObject({
					article: {
						article_id: 1,
						title: 'Living in the shadow of a great man',
						body: 'I find this existence challenging',
						votes: 103,
						topic: 'mitch',
						author: 'butter_bridge',
						created_at: expect.any(String),
					},
				});
			});
	});
});

// describe('GET ARTICLE OBJECT', () => {
// 	test('Gets article object that uses several queries', () => {
// 		return request(app)
// 			.get('/api/articles')
// 			.expect(200)
// 			.then((res) => {
// 				expect(typeof res.body).toBe('object');
// 				expect(res.body).toMatchObject({
// 					article: {
// 						article_id: 1,
// 						title: 'Living in the shadow of a great man',
// 						body: 'I find this existence challenging',
// 						votes: 103,
// 						topic: 'mitch',
// 						author: 'butter_bridge',
// 						created_at: expect.any(String),
// 					},
// 				});
// 			});
// 	});
// });

describe('GET ARTICLE COMMENTS', () => {
	test('Retrieves an array of comments for the given article id', () => {
		return request(app)
			.get('/api/articles/1/comments')
			.expect(200)
			.then((res) => {
				expect(res.body.comments).toHaveLength(11);
				res.body.comments.forEach((comment) => {
					expect(comment).toEqual(
						expect.objectContaining({
							article_id: expect.any(Number),
							comment_id: expect.any(Number),
							body: expect.any(String),
							votes: expect.any(Number),
							author: expect.any(String),
							created_at: expect.any(String),
						})
					);
				});
			});
	});
});
