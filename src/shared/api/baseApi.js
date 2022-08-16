const apiUrl = 'http://localhost:3001'

const baseFetch = (url, config = {}, params) => {
	return new Promise((resolve, reject) => {
		try {
			if (params) {
				config.body = JSON.stringify(params)
			}
			fetch(`${apiUrl}${url}`, {
				...config
			})
				.then((response) => response.json())
				.then(resolve, reject)
		} catch (e) {
			reject(e)
		}
	})
}

const fetchGet = (url, config) => {
	return baseFetch(url, config)
}

const fetchPost = (url, params = {}, config = {}) => {
	return baseFetch(
		url,
		{
			...config,
			method: 'POST'
		},
		params
	)
}

const fetchPut = (url, params = {}, config = {}) => {
	return baseFetch(
		url,
		{
			...config,
			method: 'PUT'
		},
		params
	)
}
const fetchPatch = (url, params = {}, config = {}) => {
	return baseFetch(
		url,
		{
			...config,
			method: 'PATCH'
		},
		params
	)
}

const fetchDelete = (url, params = {}, config = {}) => {
	return baseFetch(
		url,
		{
			...config,
			method: 'DELETE'
		},
		params
	)
}

export default {
	get: fetchGet,
	post: fetchPost,
	put: fetchPut,
	patch: fetchPatch,
	delete: fetchDelete
}
