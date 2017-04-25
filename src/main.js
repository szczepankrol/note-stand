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
		showHeader: true,
		songs: [
		{
			'slug': 'song-1',
			'name': 'Song 1',
			'defaultKey': 'E',
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
				[5, 0, 0],
				[8, 1, 0],
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
				[4, 0, 0],
				[12, 1, 0],
				[0, 0, 2],
				],
				],
			}
			],
		},
		],
	},
	mutations: {
		createNewEmptySong(state){
			state.songs[state.songs.length] = {
				'name': 'New song title',
				'slug': 'new',
				'defaultKey': 'C',
				'sections': [],
			}
		},
		addNewSection(state, payload){
			let chosenSong = state.songs.filter(song => song.slug === payload.songSlug)[0]
			let newSection = {
				'name': payload.name,
				'slug': slugFromString(payload.name),
				'chords': [],
			}
			chosenSong.sections.push(newSection);
		},
		addNewLine(state, payload){
			let chosenSong = state.songs.filter(song => song.slug === payload.songSlug)[0]
			let chosenSection = chosenSong['sections'].filter(section => section.slug === payload.sectionSlug)[0]
			chosenSection.chords.push([]);
		},
		addNewChord(state, payload){
			let chosenSong = state.songs.filter(song => song.slug === payload.songSlug)[0]
			let chosenSection = chosenSong['sections'].filter(section => section.slug === payload.sectionSlug)[0]
			let chosenLine = chosenSection['chords'][payload.lineIndex]
			chosenLine.push(payload.chord);
		},
	},
	actions: {

	},
	getters: {
		getAllSongs: ({songs}) => songs,

		getSongBySongSlug: (state, getters) => (songSlug) => {
			return getters.getAllSongs.filter(song => song.slug === songSlug)
		},

		getShowHeader: ({showHeader}) => showHeader,
	},
})

function slugFromString(string){
	return string.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})