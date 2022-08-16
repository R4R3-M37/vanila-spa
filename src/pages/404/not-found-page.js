class NotFoundPage extends HTMLElement {
	constructor() {
		super()
		const shadow = this.attachShadow({ mode: 'open' })
		const wrapper = document.querySelector('.wrapper')
		const style = document.createElement('style')

		style.textContent = `
	.text {
		position: relative;
		margin-top: 10px;
		text-align: center;
		color: #aaa;
		font-weight: 300;
		font-family: Catamaran, sans-serif;
		mix-blend-mode: darken;
	}
	.title {
		margin: 0;
		font-size: 100px;
		line-height: 1;
	}
	.subtitle {
		margin: 0;
		font-size: 24px;
	}
        `

		shadow.appendChild(style)
		shadow.appendChild(wrapper)
	}
}

customElements.define('not-found-page', NotFoundPage)
