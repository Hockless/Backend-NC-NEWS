const {
	selectTopics,
	selectArticleId,
	patchedArticleId,
	selectArticle,
	selectArticleComments,
	postedArticleComments,
	deletedComment,
	selectApi,
} = require('../model/model');

exports.getTopics = (req, res) => {
	selectTopics().then((result) => {
		res.status(200).send({ result });
	});
};
exports.getArticleId = (req, res) => {
	selectArticleId().then((result) => {
		res.status(200).send({ result });
	});
};
// exports.patchArticleId = (req, res) => {
// 	patchedArticleId().then(() => {
// 		res.status(200).send({ result });
// 	});
// };
exports.getArticle = (req, res) => {
	selectArticle().then((result) => {
		res.status(200).send({ result });
	});
};
exports.getArticleComments = (req, res) => {};
exports.postArticleComments = (req, res) => {};
exports.deleteComment = (req, res) => {};
exports.getApi = (req, res) => {};
