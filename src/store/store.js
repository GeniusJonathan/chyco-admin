import Vuex from 'vuex';
import Vue from 'vue';
import products from './modules/products';
import companies from './modules/companies';
import cashflows from './modules/cashflows';

// Load Vuex
Vue.use(Vuex);

// Create Store
const store = new Vuex.Store({
	modules: {
	  products,
	  companies,
	  cashflows
	}
 })
 
 export default store;