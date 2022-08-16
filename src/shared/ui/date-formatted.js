import { dateFormat } from '@/shared/common/utils'

class DateFormatted extends HTMLElement {
	constructor() {
		super()
		const shadow = this.attachShadow({ mode: 'open' })
		const wrapper = document.createElement('div')
		wrapper.setAttribute('class', 'date-formatted')

		const style = document.createElement('style')

		style.textContent = `
        .date-formatted {
            font-family: arial;
            font-size: 12px;
        }
        `
		shadow.appendChild(style)
		shadow.appendChild(wrapper)
	}

	static get observedAttributes() {
		return ['date']
	}

	connectedCallback() {
		this.updateElement()
	}

	attributeChangedCallback() {
		this.updateElement()
	}

	updateElement() {
		const shadow = this.shadowRoot
		const currentDate = this.getAttribute('date')

		const date = shadow.querySelector('.date-formatted')
		date.textContent = dateFormat(currentDate)
	}
}

customElements.define('date-formatted', DateFormatted)
