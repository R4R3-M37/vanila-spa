const APP_CONSTANTS = {
	routes: {
		index: '/',
		post: '/posts/:post',
		posts: '/posts',
		postsSearch: '/posts/search/:search',
		user: '/users/:user',
		users: '/users',
		usersSearch: '/users/search/:search',
		userPosts: '/users/:user/posts',
		userComments: '/users/:user/comments'
	},
	search: {
		types: {
			post: 'post',
			user: 'user'
		}
	},
	lists: {
		types: {
			post: 'post',
			user: 'user',
			comment: 'comment'
		}
	}
}

export default APP_CONSTANTS
