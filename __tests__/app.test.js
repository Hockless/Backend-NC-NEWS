const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const request = require('supertest');
beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('get Topics', () => {
	test('responds with message all ok', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual({ message: 'all ok' });
			});
	});
});

describe('', () => {
	test('', () => {});
});

describe('', () => {
	test('', () => {});
});

describe('', () => {
	test('', () => {});
});

describe('', () => {
	test('', () => {});
});

describe('', () => {
	test('', () => {});
});

describe('', () => {
	test('', () => {});
});

describe('', () => {
	test('', () => {});
});

describe('', () => {
	test('', () => {});
});
