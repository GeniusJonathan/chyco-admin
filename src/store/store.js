import Vuex from 'vuex';
import Vue from 'vue';
import products from './modules/products';
import companies from './modules/companies';

// Load Vuex
Vue.use(Vuex);

// Create Store
const store = new Vuex.Store({
	modules: {
	  products,
	  companies
	}
 })
 
 export default store;