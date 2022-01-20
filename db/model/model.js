const res = require('express/lib/response');
const db = require('../connection');
const format = require('pg-format');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics;').then((result) => {
		return result.rows;
	});
};

exports.selectArticleId = (article_id) => {
	return db
		.query(
			`SELECT articles.*, COUNT(comments.comment_id) AS comment_count 
			FROM articles 
			JOIN comments ON comments.article_id = articles.article_id 
			WHERE articles.article_id = $1 
			GROUP BY articles.article_id;`,
			[article_id]
		)
		.then((result) => {
			return result.rows[0];
		});
};
//
exports.patchedArticleId = (article_id, inc_votes) => {
	const enquiryValue = [inc_votes, article_id];
	console.log(enquiryValue);
	const SQL =
		'UPDATE articles SET votes = votes + %L WHERE article_id = %L RETURNING *;';
	const string = format(SQL, ...enquiryValue);
	return db.query(string).then((res) => {
		return res.rows[0];
	});
};

exports.selectArticle = (queries) => {
	const { sort_by, order, topic } = queries;
	return db
		.query('SELECT * FROM articles;', [sort_by, order, topic])
		.then((result) => {
			return result.rows;
		});
};
exports.selectArticleComments = (article_id) => {
	return db
		.query('SELECT * FROM comments WHERE article_id = $1;', [article_id])
		.then((res) => {
			return res.rows;
		});
};

exports.postedArticleComments = (newComment) => {
	const { body, author } = newComment;
	return db
		.query(`INSERT INTO comments (body, author) VALUES ($1, $2) RETURNING *;`, [
			body,
			author,
		])
		.then((res) => {
			console.log(res.rows[0]);
		});
};
exports.deletedComment = (comment) => {
	return db.query('DELETE FROM comments WHERE comment_id = $1;', [comment]);
};
exports.selectApi = () => {};
