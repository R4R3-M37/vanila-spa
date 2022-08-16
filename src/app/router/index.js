import Route from 'route-parser'

import APP_CONSTANTS from '@/shared/common/constants'

import NotFound from '@/pages/404/not-found.template'
import HomePage from '@/pages/home/home.template'
import PostsPage from '@/pages/posts/posts.template'
import UsersPage from '@/pages/users/users.template'
import PostPage from '@/pages/post/post.template'
import UserPage from '@/pages/user/user.template'
import UserPostsPage from '@/pages/user/user-posts.template'
import UserCommentsPage from '@/pages/user/user-comments.template'

export const routes = {
	Home: new Route(APP_CONSTANTS.routes.index),
	Posts: new Route(APP_CONSTANTS.routes.posts),
	PostsSearch: new Route(APP_CONSTANTS.routes.postsSearch),
	Users: new Route(APP_CONSTANTS.routes.users),
	UsersSearch: new Route(APP_CONSTANTS.routes.usersSearch),
	Post: new Route(APP_CONSTANTS.routes.post),
	User: new Route(APP_CONSTANTS.routes.user),
	UserPosts: new Route(APP_CONSTANTS.routes.userPosts),
	UserComments: new Route(APP_CONSTANTS.routes.userComments)
}

const routesWithPages = [
	{ route: routes.Home, page: HomePage },
	{ route: routes.Posts, page: PostsPage },
	{ route: routes.PostsSearch, page: PostsPage },
	{ route: routes.Users, page: UsersPage },
	{ route: routes.UsersSearch, page: UsersPage },
	{ route: routes.Post, page: PostPage },
	{ route: routes.User, page: UserPage },
	{ route: routes.UserPosts, page: UserPostsPage },
	{ route: routes.UserComments, page: UserCommentsPage }
]

const getPathRoute = (path) => {
	const target = routesWithPages.find((r) => r.route.match(path))

	if (target) {
		const params = target.route.match(path)
		return {
			page: target.page,
			route: target.route,
			params
		}
	}

	return null
}

export const render = (path) => {
	let html = NotFound()
	const pathRoute = getPathRoute(path)

	if (pathRoute) {
		html = pathRoute.page(pathRoute.params)
	}

	document.querySelector('#app').innerHTML = html
}

export const link = (path) => {
	window.history.pushState({ path }, path, path)
	render(path)
}

const initRouter = () => {
	window.addEventListener('popstate', () => {
		render(new URL(window.location.href).pathname)
	})
	document.querySelectorAll('[href^="/"]').forEach((el) => {
		el.addEventListener('click', (env) => {
			env.preventDefault()
			const { pathname } = new URL(env.target.href)
			link(pathname)
		})
	})
	render(new URL(window.location.href).pathname)
}

export default initRouter
