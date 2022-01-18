exports.createUsers = (userData) => {
	const formattedUsers = userData.map((users) => {
		return [users.username, users.avatar_url, users.name];
	});
	return formattedUsers;
};

exports.createTopics = (topicData) => {
	const formattedTopics = topicData.map((topics) => {
		return [topics.slug, topics.description];
	});
	return formattedTopics;
};
exports.createArticles = (articlesData) => {
	const formattedArticles = articlesData.map(
		({ title, body, votes, topic, author, created_at }) => {
			return [title, body, votes, topic, author, created_at];
		}
	);
	return formattedArticles;
};

exports.createComments = (commentsData) => {
	const formattedComments = commentsData.map((comments) => {
		return [
			comments.author,
			comments.article_id,
			comments.votes,
			comments.created_at,
			comments.body,
		];
	});
	return formattedComments;
};
