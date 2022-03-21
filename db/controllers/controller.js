const {
	selectTopics,
	selectArticleId,
	patchedArticleId,
	selectArticle,
	selectArticleComments,
	insertComment,
	deletedComment,
	selectApi,
} = require('../model/model');

const endpoints = require('./../../endpoints.json');

exports.getTopics = (req, res) => {
	selectTopics().then((result) => {
		res.status(200).send({ result });
	});
};

exports.getArticleId = (req, res) => {
	const { article_id } = req.params;
	selectArticleId(article_id).then((article) => {
		res.status(200).send({ article });
	});
};

exports.patchArticleId = (req, res, next) => {
	const { article_id } = req.params;
	const { inc_votes } = req.body;
	patchedArticleId(article_id, inc_votes)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch((err) => next(err));
};

exports.getArticle = (req, res) => {
	const { sort_by, order, topic } = req.query;
	selectArticle(sort_by, order, topic)
		.then((article) => {
			res.status(200).send({ article });
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getArticleComments = (req, res) => {
	const { article_id } = req.params;
	selectArticleComments(article_id).then((comments) => {
		res.status(200).send({ comments });
	});
};

exports.postComment = async (req, res) => {
	const { article_id } = req.params;
	const { username: author, body } = req.body;
	const comment = await insertComment({ article_id, author, body });
	res.status(201).send({ comment });
};

exports.deleteComment = (req, res) => {
	deletedComment().then(() => {
		res.status(204).send();
	});
};

exports.getApi = (req, res) => {
	res.status(200).send({ endpoints });
};
