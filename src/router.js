import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import Companies from './views/Companies.vue'
import Cashflow from './views/Cashflow.vue'
import Balance from './views/Balance.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies
    },
    {
      path: '/cashflow',
      name: 'cashflow',
      component: Cashflow
    },
    {
      path: '/balance',
      name: 'balance',
      component: Balance
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
