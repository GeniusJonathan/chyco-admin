import Vuex from 'vuex';
import Vue from 'vue';
import products from './modules/products';

// Load Vuex
Vue.use(Vuex);

// Create Store
const store = new Vuex.Store({
	modules: {
	  products
	}
 })
 
 export default store;