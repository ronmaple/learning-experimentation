const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolver = require('./comments');

module.exports = {
	Post: {
		likeCount: (parent) => parent.likes.length,
		commentCount: (parent) => parent.comments.length,
	},
	Query: {
		...postsResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...postsResolvers.Mutation,
		...commentsResolver.Mutation,
	},
	Subscription: {
		...postsResolvers.Subscription,
	},
};
