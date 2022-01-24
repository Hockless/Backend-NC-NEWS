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
	const SQL =
		'UPDATE articles SET votes = votes + %L WHERE article_id = %L RETURNING *;';
	const string = format(SQL, ...enquiryValue);
	return db.query(string).then((res) => {
		return res.rows[0];
	});
};

exports.selectArticle = (sort_by = 'created_at', order = 'DESC', topic) => {
	const newArr = [];
	let queryStr = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count 
	FROM articles 
	LEFT JOIN comments ON comments.article_id = articles.article_id`;
	if (topic) {
		queryStr += ` WHERE articles.topic = $1`;
		newArr.push(topic);
	}
	queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`;
	return db.query(queryStr, newArr).then((result) => {
		return result.rows;
	});
	// .catch((err) => console.log(err));
};
exports.selectArticleComments = (comment_id) => {
	return db
		.query(`SELECT * FROM comments WHERE article_id = $1;`, [comment_id])
		.then((res) => {
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postedArticleComments = (newComment) => {
	const { body, author } = newComment;
	console.log(newComment);
	return db
		.query(`INSERT INTO comments (body, author) VALUES ($1, $2) RETURNING *;`, [
			body,
			author,
		])
		.then((res) => {
			return res.rows[0];
		});
};
exports.deletedComment = (comment) => {
	return db.query('DELETE FROM comments WHERE comment_id = $1;', [comment]);
};
exports.selectApi = () => {};
