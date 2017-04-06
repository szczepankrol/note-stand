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
		name: 'home',
		component: Songs
	},
	{
		path: '/song/:slug',
		name: 'song',
		component: Song
	},
	// {
	// 	path: '/category/:slug',
	// 	name: 'category',
	// 	component: Category
	// }
	]
})
