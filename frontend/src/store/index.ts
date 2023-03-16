import { createStore } from 'vuex'
import INetwork from '../models/INetwork'
export default createStore({
  state: {
    networks: <INetwork[]> []
  },
  getters: {
    getNetworks: state => state.networks
  },
  mutations: {
    setNetworks (state, networks) {
      state.networks = networks
    }
  },
  actions: {
  },
  modules: {
  }
})
