// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false


const store = new Vuex.Store({
	state: {
		songs: [
		{
			'slug': 'song-1',
			'name': 'Song 1',
		},
		{
			'slug': 'song-2',
			'name': 'Song 2',
		},
		],
		songChords: [
		{
			'slug': 'song-1',
			'defaultKey': 'C',
			'sections': [
				{
					'name': 'Verse',
					'slug': 'verse',
					'chords': [
						[
							[0, 0, 0],
							[5, 0, 1],
							[7, 0, 2],
						],
						[
							[5, 0],
							[8, 1],
							[0, 0, 4],
						],
					],
				},
				{
					'name': 'Chorus',
					'slug': 'chorus',
					'chords': [
						[
							[3, 0, 0],
							[4, 0, 1],
							[1, 1, 2],
						],
						[
							[4, 0],
							[12, 1],
							[0, 0, 2],
						],
					],
				}
			],
		}
		],
	},
	mutations: {
	},
	actions: {
	},
	getters: {
		getAllSongs: ({songs}) => songs,

		getAllSongChords: ({songChords}) => songChords,

		getSongChordsBySongSlug: (state, getters) => (songSlug) => {
			return getters.getAllSongChords.filter(songChord => songChord.slug === songSlug)
		},
	},
})


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})