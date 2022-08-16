import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import TemplateLoader from './plugins/vite-template-plugin'
import path from 'path'

export default defineConfig({
	build: {
		target: 'es2017',
		outDir: 'build'
	},
	server: {
		port: 3000,
		host: '0.0.0.0',
		hmr: true
	},
	plugins: [
		TemplateLoader(),
		legacy({
			targets: ['defaults', 'not IE 11']
		})
	],
	resolve: {
		alias: {
			'@/': `${path.resolve(__dirname, 'src')}/`
		}
	}
})
