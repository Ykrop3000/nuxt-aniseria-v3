export const state = () => ({
  character: {}
})

export const mutations = {
  setCharapter (state, val) {
    state.character = val
  }
}
export const actions = {
  clearCharapter ({ commit }) {
    commit('setCharapter', {})
  },
  fetchCharapter ({ commit, dispatch }, id) {
    dispatch('clearCharapter')
    return new Promise((resolve, reject) => {
      this.$axios({ url: `/api/characters/${id}`, method: 'GET' })
        .then((resp) => {
          commit('setCharapter', resp.data)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export const getters = {
  getCharapter: s => s.character
}
