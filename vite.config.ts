import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`,
		},
	},
	define: {
		GIT_COMMIT_HASH: JSON.stringify(execSync('git rev-parse HEAD').toString().trim()),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		PACKAGE_VERSION: JSON.stringify(JSON.parse(readFileSync('package.json', 'utf-8')).version),
		BUILT_AT: JSON.stringify(Date.now()),
	},
	plugins: [
		Vue(),
		Pages(),
		VitePWA({
			srcDir: 'src',
			filename: 'sw.ts',
			base: '/',
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			manifest: {
				theme_color: '#090a16',
				background_color: '#090a16',
				name: 'Cosmicord.js Docs',
				short_name: 'Cosmicord Docs',
				start_url: '.',
				display: 'standalone',
				description:
					"Cosmicord.js is a powerful and intuitive Lavalink wrapper designed to simplify the process of integrating Lavalink into your Node.js applications.",
				icons: [
					{
						src: '/logo.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
		Components({
			resolvers: [IconsResolver({ prefix: '' })],
		}),
		Icons(),
	],

	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core'],
		exclude: ['vue-demi'],
	},
});
