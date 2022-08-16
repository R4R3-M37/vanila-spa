import { getPosts, getPostsByUser, getPostsSearch } from '@/shared/api/postsApi'
import { setPost } from '@/shared/cache/posts'

class PostsComponent extends HTMLElement {
	constructor() {
		super()
		this.search = ''
		this.page = 1
		this.lastPage = false

		const shadow = this.attachShadow({ mode: 'open' })
		const wrapper = document.createElement('div')
		wrapper.setAttribute('class', 'posts-block')

		const title = document.createElement('h2')
		title.setAttribute('class', 'posts-title')
		shadow.appendChild(title)

		const pagination = document.createElement('pagination-component')
		pagination.setAttribute('class', 'posts-pagination')
		pagination.setAttribute('page', this.page)
		pagination.setAttribute('last', this.lastPage)

		pagination.addEventListener('paginate-back', (e) => {
			e.stopPropagation()
			if (this.page > 1) {
				this.page -= 1
				this.getPostsPage()
			}
		})

		pagination.addEventListener('paginate-next', (e) => {
			e.stopPropagation()
			if (!this.lastPage) {
				this.page += 1
				this.getPostsPage()
			}
		})

		shadow.appendChild(pagination)

		const style = document.createElement('style')

		style.textContent = `
            .posts-block {
	            display: flex;
	            align-items: flex-start;
	            justify-content: center;
	            flex-wrap: wrap;
	            padding: 25px;
            }
            .posts-title {
                text-align: center;
            }
            .posts-pagination {
                display: flex;
                justify-content: center;
            }
        `

		shadow.appendChild(style)
		shadow.appendChild(wrapper)
	}

	static get observedAttributes() {
		return ['search']
	}

	connectedCallback() {
		const shadow = this.shadowRoot
		const userId = this.getAttribute('user')
		const search = this.getAttribute('search')

		if (search) {
			this.search = search
		}

		const title = shadow.querySelector('.posts-title')
		title.textContent = 'All posts'

		if (userId) {
			title.textContent = 'Users posts'
		}

		this.getPostsPage()
	}

	attributeChangeCallback(name, oldValue, newValue) {
		if (name === 'search') {
			this.search = newValue
			this.getPostsPage()
		}
	}

	getPostsPage() {
		const shadow = this.shadowRoot
		const userId = this.getAttribute('user')
		const wrapper = shadow.querySelector('.posts-block')
		const pagination = shadow.querySelector('.posts-pagination')

		pagination.setAttribute('page', this.page)
		pagination.setAttribute('last', this.lastPage)

		wrapper.innerHTML = ''

		const apiCall = this.search
			? getPostsSearch(this.search, this.page)
			: userId
			? getPostsByUser(userId, this.page)
			: getPosts(this.page)

		apiCall
			.then((posts) => {
				this.lastPage = this.page === 30 || posts.length < 10
				pagination.setAttribute('last', this.lastPage)
				posts.forEach((post) => {
					setPost(post)
					const postElement = document.createElement('post-component')
					postElement.setAttribute('id', post.id)
					if (this.search) {
						postElement.setAttribute('search', this.search)
					}
					wrapper.appendChild(postElement)
				})
			})
			.catch((e) => console.log(e))
	}
}

customElements.define('posts-component', PostsComponent)
