const express = require('express');
const {
	welcomeMessage,
} = require('../../Backend/be-rated-restaurants/controllers/welcomeController');
const {
	getTopics,
	getArticleId,
	patchArticleId,
	getArticle,
	getArticleComments,
	postArticleComments,
	deleteComment,
} = require('./db/controllers/controller');

const app = express();
app.use(express.json());

app.get('/api', welcomeMessage);
app.get('/api/topics', getTopics);
app.get('/api/article/:article_id', getArticleId);
// app.patch('/api/articles/:article_id', patchArticleId);
app.get('/api/articles', getArticle);
// app.get('/api/articles/:article_id/comments', getArticleComments);
// app.post('/api/articles/:article_id/comments', postArticleComments);
// app.delete('/api/comments/:comment_id', deleteComment);
// app.get('/api', getApi);

module.exports = app;
