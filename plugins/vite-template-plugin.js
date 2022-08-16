const filterRegExp = /\.(template)$/

const templatePlugin = () => {
	return {
		name: 'template-loader-plugin',
		transform(src, id) {
			if (filterRegExp.test(id)) {
				return {
					code: `export default function template(props = {}){ return \`${src}\`}`,
					map: null
				}
			}
		}
	}
}

export default templatePlugin
