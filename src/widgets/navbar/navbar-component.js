import APP_CONSTANTS from '@/shared/common/constants'
import { link, routes } from '@/app/router'

class NavbarComponent extends HTMLElement {
	constructor() {
		super()
		const shadow = this.attachShadow({ mode: 'open' })
		const wrapper = document.createElement('div')
		const style = document.createElement('style')

		this.searchType = APP_CONSTANTS.search.types.post

		wrapper.setAttribute('class', 'main-menu')
		this.links = [
			{
				href: APP_CONSTANTS.routes.index,
				name: 'Home',
				class: 'home-link'
			},
			{
				href: APP_CONSTANTS.routes.posts,
				name: 'Posts',
				class: 'posts-link'
			},
			{
				href: APP_CONSTANTS.routes.users,
				name: 'Users',
				class: 'users-link'
			}
		]

		style.textContent = `
           .main-menu {
               display: flex;
               align-items: center;
               padding: 5px;
           }
           .global-search {
               font-size: 16px;
               border: 1px solid #ccc;
               border-radius: 8px;
               padding: 4px 20px;
               width: 100%;
               margin: 0 50px;
           }
           .global-search:placeholder{
               color: #aaa;
           }
           
        `

		shadow.appendChild(style)
		shadow.appendChild(wrapper)

		this.links.forEach((link) => {
			const l = document.createElement('nav-link')
			l.setAttribute('class', `main-link ${link.class}`)
			l.setAttribute('href', link.href)
			l.setAttribute('text', link.name)
			wrapper.appendChild(l)
		})

		const search = document.createElement('input')
		search.setAttribute('class', 'global-search')
		search.addEventListener('keyup', (e) => {
			e.stopPropagation()
			if (e.key === 'Enter') {
				e.preventDefault()
				const text = e.target.value
				if (text) {
					if (this.searchType === APP_CONSTANTS.search.types.post) {
						const url = routes.PostsSearch.reverse({ search: text })
						link(url)
					} else {
						const url = routes.UsersSearch.reverse({ search: text })
						link(url)
					}
				}
			}
		})

		wrapper.appendChild(search)
	}

	static get observedAttributes() {
		return ['search', 'type']
	}

	updateSearch() {
		const shadow = this.shadowRoot
		const input = shadow.querySelector('input')
		input.value = this.getAttribute('search')
		if (this.searchType === APP_CONSTANTS.search.types.post) {
			input.setAttribute('placeholder', 'Search posts...')
		} else if (this.searchType === APP_CONSTANTS.search.types.user) {
			input.setAttribute('placeholder', 'Search user...')
		}
	}

	connectedCallback() {
		const shadow = this.shadowRoot
		const searchText = this.getAttribute('search')
		this.searchType = this.getAttribute('type')
			? this.getAttribute('type')
			: APP_CONSTANTS.search.types.post

		if (searchText) {
			const input = shadow.querySelector('input')
			input.value = searchText
		}

		const { pathname } = new URL(window.location.href)
		const link = this.links.find((l) => l.href === pathname)

		if (link) {
			const linkElement = shadow.querySelector(`.${link.class}`)
			linkElement.setAttribute('selected', 'true')
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'search') {
			this.updateSearch()
		}
		if (name === 'type') {
			this.searchType = newValue
			this.updateSearch()
		}
	}
}

customElements.define('main-navbar', NavbarComponent)
