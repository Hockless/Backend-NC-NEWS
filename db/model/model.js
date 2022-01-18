const db = require('../connection');

exports.selectTopics = () => {
	return db.query('SELECT * FROM topics;').then((result) => {
		return result.rows;
	});
};
exports.selectArticleId = () => {
	return db.query('SELECT article_id FROM articles;').then((result) => {
		return result.rows;
	});
};
// exports.patchedArticleId = () => {};

exports.selectArticle = () => {
	return db.query('SELECT * FROM articles;').then((result) => {
		return result.rows;
	});
};
exports.selectArticleComments = () => {};
exports.postedArticleComments = () => {};
exports.deletedComment = () => {};
exports.selectApi = () => {};
