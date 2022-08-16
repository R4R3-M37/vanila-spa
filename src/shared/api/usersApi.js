import baseApi from '@/shared/api/baseApi'

export const getUsers = (page) => {
	return baseApi.get(`/users?_page=${page}&limit=10`)
}

export const getUsersById = (userId) => {
	return baseApi.get(`/users/?id=${userId}`)
}

export const getUsersSearch = (search, page) => {
	return baseApi.get(`/users?q=${search}&_page=${page}&limit=10`)
}
