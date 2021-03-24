export const state = () => ({
  calendar: []
})

export const mutations = {
  setCalendar (store, val) {
    store.calendar = val
  }
}
export const actions = {
  fetchCalendar ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios({ url: '/api/calendar', method: 'GET' })
        .then((resp) => {
          commit('setCalendar', resp.data.filter(d => d.anime))
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export const getters = {
  getCalendar: s => s.calendar
}
