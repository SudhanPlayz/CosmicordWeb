<template>
	<div class="bg-discord-blurple-500 py-20">
		<div class="max-w-3xl sm:mx-auto text-center px-8 sm:px-16 flex flex-col gap-10 md:px-12">
			<Logo class="filter drop-shadow-lg my-6" />
			<InstallButton />
		</div>
	</div>

	<div
		class="prose prose-discord dark:prose-light lg:prose-lg px-6 mx-auto pb-8 w-full xl:grid xl:grid-cols-2 xl:gap-x-12 xl:max-w-prose"
	>
		<div class="col-span-full">
			<h2>About</h2>
			<h3>Imagine a Lavalink Wrapper</h3>
			<p>
				Cosmicord.js is a powerful and intuitive Lavalink wrapper designed to simplify the process of integrating Lavalink into your
				<a href="https://nodejs.org" target="_blank" rel="noopener"
					>Node.js <heroicons-outline-external-link class="h-5 w-5 inline-block mb-1" aria-hidden="true"
				/></a>
				applications.
			</p>
			<p>
				Cosmicord.js offers advanced features such as track management, event handling, and extensive configuration options, allowing you to customize the behavior of your audio system. Whether you're a seasoned developer or just starting out, Cosmicord.js empowers you to create immersive audio experiences with ease. 
			</p>
		</div>
		<div>
			<h2>Why?</h2>
			<ul>
				<li>Object-oriented</li>
				<li>Speedy and efficient</li>
				<li>Feature-rich</li>
				<li>Flexible</li>
				<li>100% Promise-based</li>
			</ul>
		</div>
		<div>
			<h2>Statistics</h2>
			<Stats />
			<p class="text-center">... and growing!</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import InstallButton from '~/components/InstallButton.vue';
import Logo from '~/components/Logo.vue';
import Stats from '~/components/Stats.vue';
import MainSource from '~/data/MainSource';
import { useStore } from '~/store';

useHead({
	title: computed(() => 'Cosmicord.js'),
});

const store = useStore();

const docs = computed(() => store.state.docs);

if (!docs.value) {
	void store.dispatch('fetchDocs', { inputSource: MainSource });
}
</script>
