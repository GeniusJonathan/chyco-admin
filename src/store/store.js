import Vuex from 'vuex';
import Vue from 'vue';
import products from './modules/products';
import companies from './modules/companies';
import balances from './modules/balances';
import cashflows from './modules/cashflows';

// Load Vuex
Vue.use(Vuex);

// Create Store
const store = new Vuex.Store({
	modules: {
	  products,
	  balances,
	  companies,
	  cashflows
	}
 })
 
 export default store;