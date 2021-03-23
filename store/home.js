
export const state = () => ({
  carousel: [],
  lists: [],
  listsParams: [
    {
      title: 'Популярное',
      filter: {
        order: 'popularity'
      }
    },
    {
      title: 'Лучшее',
      filter: {
        order: 'ranked'
      }
    },
    {
      title: 'Новое',
      filter: {
        order: 'popularity',
        season: 'winter_2021'
      }
    },
    {
      title: 'Анонс',
      filter: {
        order: 'popularity',
        status: 'anons'
      }
    }
  ]
})

export const mutations = {
  setCarousel (state, data) {
    state.carousel = data
  },
  setImageCarousel (state, { key, val }) {
    state.carousel[key].image.preview = val
  },
  addList (state, data) {
    state.lists = state.lists.concat({ list: data.list, title: data.title })
  }
}
export const actions = {
  fetchCarousel ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios({ url: '/api/animes', params: { status: 'ongoing', order: 'popularity', limit: 10 }, method: 'GET' })
        .then((resp) => {
          commit('setCarousel', resp.data)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  fetchList ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios({ url: '/api/animes', params: Object.assign(params.filter, { limit: 6 }), method: 'GET' })
        .then((resp) => {
          commit('addList', { list: resp.data, title: params.title })
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
export const getters = {
  getCarousel: s => s.carousel,
  getLists: s => s.lists,
  getListsParams: s => s.listsParams
}
