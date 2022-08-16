import { link } from '@/app/router'
import {
	getUserInitials,
	invertColor,
	randomColor
} from '@/shared/common/utils'

class UserAvatarComponent extends HTMLElement {
	constructor() {
		super()
		const shadow = this.attachShadow({ mode: 'open' })
		const wrapper = document.createElement('div')
		wrapper.setAttribute('class', 'user-avatar')

		const text = document.createElement('div')
		text.setAttribute('class', 'avatar-text')
		wrapper.appendChild(text)

		const style = document.createElement('style')
		this.selected = false

		const bgColor = randomColor()
		const textColor = invertColor(bgColor)

		style.textContent = `
            .user-avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                width: 40px;
                height: 40px;
                text-transform: uppercase;
                border-radius: 16px;
                background-color: ${bgColor};
                color: ${textColor};
            }
            .user-avatar.small {
                font-size: 20px;
                width: 32px;
                height: 32px;
            }
        `

		shadow.appendChild(style)
		shadow.appendChild(wrapper)
	}

	static get observedAttributes() {
		return ['user-name', 'small']
	}

	connectedCallback() {
		this.updateElement()
	}

	onClick = (e) => {
		e.preventDefault()
		if (!this.selected) {
			const { pathname } = new URL(e.target.href)
			link(pathname)
		}
	}

	attributeChangedCallback() {
		this.updateElement()
	}

	updateElement() {
		const shadow = this.shadowRoot
		const userName = this.getAttribute('user-name')
		const userAvatar = shadow.querySelector('.user-avatar')
		const userAvatarSmall = this.getAttribute('small')
		const text = shadow.querySelector('.avatar-text')

		if (userAvatarSmall) {
			userAvatar.setAttribute('class', 'user-avatar small')
		} else {
			userAvatar.setAttribute('class', 'user-avatar')
		}

		if (userName) {
			text.textContent = getUserInitials(userName)
		}
	}
}

customElements.define('user-avatar', UserAvatarComponent)
