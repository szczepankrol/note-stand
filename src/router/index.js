import Vue from 'vue'
import Router from 'vue-router'
import Songs from '@/components/Songs'
import Song from '@/components/Song'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
	{
		path: '/',
		name: 'songs',
		component: Songs
	},
	{
		path: '/song/:slug/:mode',
		name: 'song',
		component: Song
	},
	{
		path: '/playlists',
		name: 'playlists',
		component: Songs
	},
	]
})
