import baseApi from '@/shared/api/baseApi'

export const getPosts = (page) => {
	return baseApi.get(`/posts?_page=${page}&limit=10&_expand=user`)
}

export const getPostsByUser = (userId, page) => {
	return baseApi.get(
		`/posts?userId=${userId}&_page=${page}&limit=10&_expand=user`
	)
}

export const getPostById = (postId) => {
	return baseApi.get(`/posts/?id=${postId}&_expand=user`)
}

export const getPostsSearch = (search, page) => {
	return baseApi.get(`/posts?q=${search}&_page=${page}&limit=10&_expand=user`)
}