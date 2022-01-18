const db = require('../connection');
const format = require('pg-format');
const {
	createUsers,
	createTopics,
	createArticles,
	createComments,
	articleReference,
} = require('../../utils/seed-formatting');

const seed = (data) => {
	const { articleData, commentData, topicData, userData } = data;
	return db
		.query(`DROP TABLE IF EXISTS comments;`)
		.then(() => {
			return db.query('DROP TABLE IF EXISTS articles;');
		})
		.then(() => {
			return db.query('DROP TABLE IF EXISTS users;');
		})
		.then(() => {
			return db.query('DROP TABLE IF EXISTS topics;');
		})
		.then(() => {
			return db.query(`CREATE TABLE topics (
	    slug TEXT PRIMARY KEY,
	    description TEXT NOT NULL
	  );`);
		})
		.then(() => {
			return db.query(`CREATE TABLE users (
	    username VARCHAR(255) PRIMARY KEY,
	    avatar_url VARCHAR(255) NOT NULL,
	    name TEXT NOT NULL
	  );`);
		})
		.then(() => {
			return db.query(`CREATE TABLE articles (
	    article_id SERIAL PRIMARY KEY,
	    title VARCHAR(255) NOT NULL,
	    body TEXT NOT NULL,
	    votes INT DEFAULT 0,
	    topic TEXT REFERENCES topics(slug),
	    author TEXT REFERENCES users(username),
	    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	  );`);
		})
		.then(() => {
			return db.query(`CREATE TABLE comments (
	    comment_id SERIAL PRIMARY KEY,
      	author TEXT REFERENCES users(username),
	    article_id INT REFERENCES articles(article_id),
	    votes INT DEFAULT 0,
	    created_at TIMESTAMP DEFAULT NOW(),
	    body TEXT NOT NULL
	  );`);
		})
		.then((result) => {
			const formattedUsers = createUsers(userData);
			const sql = format(
				`INSERT INTO users
	    (username, avatar_url, name)
	    VALUES %L RETURNING *;`,
				formattedUsers
			);
			console.log(result.rows);
			return db.query(sql);
		})
		.then(() => {
			const formattedTopics = createTopics(topicData);
			const sql = format(
				`INSERT INTO topics
	    (slug, description)
	    VALUES %L RETURNING *;`,
				formattedTopics
			);
			return db.query(sql);
		})
		.then((result) => {
			// const articleRef = articleReference(result.rows);
			const formattedArticles = createArticles(articleData);
			const sql = format(
				`INSERT INTO articles
	    (title, body, votes, topic, author, created_at)
	    VALUES %L RETURNING *;`,
				formattedArticles
			);
			return db.query(sql);
		})
		.then((res) => {
			const formattedComments = createComments(commentData);
			const sql = format(
				`INSERT INTO comments
	    (author, article_id, votes, created_at, body)
	    VALUES %L RETURNING *;`,
				formattedComments
			);
			return db.query(sql);
		})
		.then((res) => {
			console.log(res.rows);
		});
};

module.exports = seed;
