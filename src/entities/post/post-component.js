import { getPost } from '@/shared/cache/posts'
import { highlightText } from '@/shared/common/utils'
import { link, routes } from '@/app/router'

class PostComponent extends HTMLElement {
	constructor() {
		super()
		const shadow = this.attachShadow({ mode: 'open' })
		const wrapper = document.createElement('div')
		wrapper.setAttribute('class', 'post-block')

		wrapper.innerHTML = `
			<div class='post-title'></div>
			<div class='post-text'></div>
			<div class='post-user'>
				<user-avatar small='true'></user-avatar>
				<div class='user-name'></div>
			</div>
		`

		const style = document.createElement('style')

		style.textContent = `
            .post-block {
	            max-width: 200px;
	            border-radius: 10px;
	            margin: 10px;
	            padding: 10px;
	            background-color: #ccc
            }
            .post-block .post-title {
                padding: 10px;
                font-weight: bold;
            }
            .post-block .post-text {
                padding: 10px;
                max-height: 200px;
                overflow: hidden;
                cursor: pointer;
            }
            .post-block .post-user {
                padding: 10px;
                background-color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
            }
            .user-avatar {
                margin-right: 10px;
            }
            .highlight {
                background-color: yellow;
            }
        `

		shadow.appendChild(style)
		shadow.appendChild(wrapper)
	}

	connectedCallback() {
		const shadow = this.shadowRoot
		const id = this.getAttribute('id')
		const search = this.getAttribute('search')
		const post = getPost(id)

		const title = shadow.querySelector('.post-title')
		title.textContent = post.title
		const text = shadow.querySelector('.post-text')

		if (search) {
			text.innerHTML = highlightText(post.text, search)
		} else {
			text.textContent = post.text
		}

		text.addEventListener('click', (e) => {
			e.stopPropagation()
			const url = routes.Post.reverse({ post: id })
			link(url)
		})

		const user = shadow.querySelector('.post-user')
		const userAvatar = shadow.querySelector('user-avatar')
		userAvatar.setAttribute('user-name', post.user.user_name)

		const userName = shadow.querySelector('.user-name')
		userName.textContent = post.user.user_fullname

		user.addEventListener('click', (e) => {
			e.stopPropagation()
			const url = routes.User.reverse({ user: post.user.id })
			link(url)
		})
	}
}

customElements.define('post-component', PostComponent)
