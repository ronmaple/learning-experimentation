const { UserInputError, AuthenticationError } = require('apollo-server');

const checkAuth = require('../../util/checkAuth');
const Post = require('../../models/Post');

module.exports = {
	Mutation: {
		createComment: async (_, { postId, body }, context) => {
			const { username } = checkAuth(context);

			if (body.trim() === '') {
				throw new UserInputError('Empty comment', {
					errors: {
						body: 'Comment body must not be empty',
					},
				});
			}

			const post = await Post.findById(postId);

			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});

				await post.save();
				return post;
			} else throw new UserInputError('Post not found');
		},
		async deleteComment(_, { postId, commentId }, context) {
			console.log('deleteComment');

			const { username } = checkAuth(context);

			console.log('postId, ', postId, 'commentId', commentId);
			const post = await Post.findById(postId);

			if (post) {
				console.log('post is good');
				const commentIndex = post.comments.findIndex((comment) => comment.id === commentId);

				console.log('post is very good');
				// Front end would not have a delete comment option when not the correct user,
				// but need to implement this as a safety net
				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1);
					console.log('all good?');
					await post.save();
					return post;
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} else {
				throw new UserInputError('Post not found');
			}
		},
	},
};
