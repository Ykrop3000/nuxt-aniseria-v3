export const state = () => ({
  status: 'sucsses',
  animes: []
})

export const mutations = {
  setAnimes (state, payload) {
    state.animes = payload
  },
  addAnimes (state, payload) {
    state.animes = state.animes.concat(payload)
  },

  ANIME_REQUEST (state) {
    state.status = 'loading'
  },
  ANIME_SUCCESS (state) {
    state.status = 'success'
  },
  ANIME_ERROR (state) {
    state.status = 'error'
  }

}
export const actions = {
  async fetchAnimes ({ commit }, payload) {
    commit('ANIME_REQUEST')
    const params = payload

    if (payload.genres) {
      params.genre = payload.genres
    }
    if (payload.ids) {
      params.ids = payload.ids.join(',')
    }
    if (!payload.key) {
      params.key = 'year'
    }
    if (!payload.limit) {
      params.limit = 24
    }

    await this.$axios({ url: `/api/${payload.type || 'animes'}`, params, method: 'GET' })
      .then((resp) => {
        let data = []
        if (resp.data.length === 0) {
          commit('ANIME_ERROR')
          return
        } else {
          data = resp.data
        }

        if (payload.page > 1) {
          commit('addAnimes', data)
        } else {
          commit('setAnimes', data)
        }

        commit('ANIME_SUCCESS')
      })
      .catch((err) => {
        console.log(err)
        commit('ANIME_ERROR')
      })
  }
}
export const getters = {
  getAnimes: s => s.animes,
  getStatus: s => s.status
}
