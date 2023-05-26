import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    events: []
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    async fetchEvents({ commit }) {
      try {
        const events = await EventService.getEvents()
        commit('SET_EVENTS', events)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
    }
  }
})
