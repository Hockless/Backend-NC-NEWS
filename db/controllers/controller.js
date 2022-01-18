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
	selectTopics().then((result) => {});
};
exports.getArticleId = (req, res) => {};
exports.patchArticleId = (req, res) => {};
exports.getArticle = (req, res) => {};
exports.getArticleComments = (req, res) => {};
exports.postArticleComments = (req, res) => {};
exports.deleteComment = (req, res) => {};
exports.getApi = (req, res) => {};
