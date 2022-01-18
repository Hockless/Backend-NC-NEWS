const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');
beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET/ API', () => {
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
	test('Responds with a list of article IDs', () => {
		return request(app)
			.get('/api/article/:article_id')
			.expect(200)
			.then((res) => {
				expect(res.body.result).toHaveLength(12);
				res.body.result.forEach((id) => {
					expect(id).toEqual(
						expect.objectContaining({
							article_id: expect.any(Number),
						})
					);
				});
			});
	});
});

describe('GET ARTICLES', () => {
	test('Responds with a list of articles', () => {
		return request(app)
			.get('/api/articles')
			.expect(200)
			.then((res) => {
				expect(res.body.result).toHaveLength(12);
				res.body.result.forEach((articles) => {
					expect(articles).toEqual(
						expect.objectContaining({
							article_id: expect.any(Number),
							author: expect.any(String),
							body: expect.any(String),
							created_at: expect.any(String),
							title: expect.any(String),
							topic: expect.any(String),
						})
					);
				});
			});
	});
});
// describe('', () => {
// 	test('', () => {});
// });

// describe('', () => {
// 	test('', () => {});
// });

// describe('', () => {
// 	test('', () => {});
// });

// describe('', () => {
// 	test('', () => {});
// });

// describe('', () => {
// 	test('', () => {});
// });

// describe('', () => {
// 	test('', () => {});
// });
