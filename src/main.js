import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import axios from 'axios'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Projects from './routes/Projects'
import Clients from './routes/Clients'
import Client from './routes/Client'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(ElementUI, {locale})

const store = new Vuex.Store({
  state: {
    routes: [
      {
        name: 'Проекты',
        path: '/projects',
        component: Projects
      },
      {
        name: 'Клиенты',
        path: '/clients',
        component: Clients
      },
      {
        name: 'Клиент',
        path: '/client',
        component: Client
      }
    ],
    reports: [
      {
        name: 'загрузка...',
        cost: 'загрузка...',
        dailyAverageCost: 'загрузка...'
      }
    ],
    clients: [
      {
        name: 'загрузка...',
        inn: 'загрузка...'
      }
    ],
    projects: [
      {
        name: 'загрузка...',
        client: [
          {
            login: 'загрузка...',
            password: 'загрузка...',
            nick: 'загрузка...',
            balance: '0000'
          }
        ]
      }
    ],
    yDLogins: [
      {
        id: '',
        account_name: 'загрузка...',
        login: 'загрузка...',
        password: 'загрузка...'
      }
    ]
  },
  actions: {
    loadClients ({ commit }) {
      axios.get(`https://adscontrol-api.1010.pp.ua/clients`)
            .then( response => response.data )
            .then( clients => {
              commit('SET_CLIENTS', clients)
            } )
    },
    loadReports ({ commit }, data) {
      axios.get(`https://adscontrol-api.1010.pp.ua/reports/clientsCostReport/?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`)
            .then( response => response.data )
            .then( reports => {
              commit('SET_REPORTS', reports)
            } )
    },
    loadProjects ({ commit }) {
      axios.get(`https://adscontrol-api.1010.pp.ua/projects`)
            .then( response => response.data )
            .then( projects => {
              commit('SET_PROJECTS', projects)
            } )
    },
    loadYDLogins ({commit}, id) {
      axios.get(`https://adscontrol-api.1010.pp.ua/ydlogins/?projectid=${id}`)
            .then( response => response.data )
            .then( yDLogins => {
              commit('SET_YDLOGINS', yDLogins)
            } )
    },
    removeClient ({ commit }, id) {
      axios.delete(`https://adscontrol-api.1010.pp.ua/clients/${id}`)
            .then( response => response.data )
            .catch( err => { console.log(err) } )
            .then( response => {store.dispatch('loadClients')} )
    },
    createClient({ commit }, data){
      axios.post(`https://adscontrol-api.1010.pp.ua/clients/`, data)
            .then( response => response.data )
            .catch( err => { console.log(err) } )
            .then( response => {store.dispatch('loadClients')} )
    },
    createProject({ commit }, data){
      axios.post(`https://adscontrol-api.1010.pp.ua/projects/`, data)
            .then( response => response.data )
            .catch( err => { console.log(err) } )
            .then( response => {store.dispatch('loadProjects')} )
    },
    createYDLogin({ commit }, data){
      axios.post(`https://adscontrol-api.1010.pp.ua/ydlogins/`, data)
            .then( response => response.data )
            .catch( err => { console.log(err) } )
            .then( response => {store.dispatch('loadYDLogins', data.project.id)} )
    },
    updateClient({ commit }, data){
      axios.put(`https://adscontrol-api.1010.pp.ua/clients/${data.id}`, data.data)
            .then( response => response.data )
            .catch( err => { console.log(err) } )
            .then( response => {store.dispatch('loadClients')} )
    },
    updateYDLogin({ commit }, data){
      axios.put(`https://adscontrol-api.1010.pp.ua/ydlogins/${data.id}`, data.data)
            .then( response => response.data )
            .catch( err => { console.log(err) } )
            .then( response => {store.dispatch('loadYDLogins', data.project_id)} )
    },
    removeYDLogin ({ commit }, data) {
      axios.delete(`https://adscontrol-api.1010.pp.ua/ydlogins/${data.id}`)
            .then( response => response.data )
            .catch( err => { console.log(err) } )
            .then( response => {store.dispatch('loadYDLogins', data.project_id)} )
    },
  },
  mutations: {
    SET_CLIENTS (state, clients) {
      state.clients =  clients
    },
    SET_REPORTS (state, reports) {
      state.reports =  reports
    },
    SET_PROJECTS (state, projects) {
      state.projects = projects
    },
    SET_YDLOGINS (state, yDLogins) {
      state.yDLogins = yDLogins
    }
  }
})

const router = new VueRouter({
  mode: 'history',
  routes: store.state.routes
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})