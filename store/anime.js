import gql from 'graphql-tag'

const kodikKey = 'b7cc4293ed475c4ad1fd599d114f4435'
const vcdnKey = 'NNJNGDFMuZZPAvckNgrfvs2JDwwGHTrp'
const kodikUrl = 'https://kodikapi.com/search'
const vcdnUrl = 'https://videocdn.tv/api/short'

export const state = () => ({
  anime: {},
  banner: '',
  related: [],
  similar: [],
  roles: [],
  kodik: {},
  vcdn: {},
  screenshots: [],
  comments: []
})

export const mutations = {

  setAnime (state, payload) { state.anime = payload },
  setBanner (state, payload) { state.banner = payload },
  setRelated (state, payload) { state.related = payload },
  setSimilar (state, payload) { state.similar = payload },
  setRoles (state, payload) { state.roles = payload },
  setKodik (state, payload) { state.kodik = payload },
  setVcdn (state, payload) { state.vcdn = payload },
  setScreenshots (state, payload) { state.screenshots = payload },
  setComments (state, payload) { state.comments = payload },
  addComments (state, payload) { state.comments = state.comments.concat(payload) }
}
export const actions = {
  clearAnime ({ commit }) {
    commit('setBanner', '')
    commit('setAnime', {})
    commit('setRoles', [])
    commit('setSimilar', [])
    commit('setRelated', [])
    commit('setKodik', {})
    commit('setVcdn', {})
    commit('setScreenshots', [])
    commit('setComments', [])
  },
  async fetchAnime ({ commit, dispatch }, payload) {
    dispatch('clearAnime')
    await this.$axios({ url: `/api/${payload.type}/${payload.slug}`, method: 'GET' })
      .then((resp) => {
        commit('setAnime', resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchRelated ({ commit }, params) {
    await this.$axios({ url: `/api/${params.type}/${params.id}/related`, method: 'GET' })
      .then((resp) => {
        commit('setRelated', resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchSimilar ({ commit }, params) {
    await this.$axios({ url: `/api/${params.type}/${params.id}/similar`, method: 'GET' })
      .then((resp) => {
        commit('setSimilar', resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchRoles ({ commit }, params) {
    await this.$axios({ url: `/api/${params.type}/${params.id}/roles`, method: 'GET' })
      .then((resp) => {
        commit('setRoles', resp.data.filter(d => d.character != null))
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchKodik ({ commit }, payload) {
    await this.$axios({ url: kodikUrl, params: { token: kodikKey, shikimori_id: payload }, method: 'GET', headers: {} })
      .then((resp) => {
        commit('setKodik', resp.data.results[0])
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchVcdn ({ commit }, payload) {
    await this.$axios({ url: vcdnUrl, params: { api_token: vcdnKey, kinopoisk_id: payload }, method: 'GET', headers: {} })
      .then((resp) => {
        commit('setVcdn', resp.data.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchScreenshots ({ commit }, payload) {
    await this.$axios({ url: `/api/animes/${payload}/screenshots`, method: 'GET' })
      .then((resp) => {
        commit('setScreenshots', resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchComments ({ commit, state }, props) {
    const params = {
      commentable_id: props.id,
      commentable_type: 'Topic',
      limit: 10,
      page: props.page,
      desc: 1
    }
    await this.$axios({ url: '/api/comments', params, method: 'GET' })
      .then((resp) => {
        if (props.page === 0) {
          commit('setComments', resp.data)
        } else {
          commit('addComments', resp.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async fetchBanner ({ commit }, search) {
    const clientApollo = this.app.apolloProvider.defaultClient
    const response = await clientApollo.query({
      query: gql`
        query ($search: String) {
          Media(search: $search, type: ANIME) {
            id
            bannerImage
          }
        }
      `,
      variables: { search }
    })
    commit('setBanner', response.data.Media ? response.data.Media.bannerImage : NaN)
  }
}
export const getters = {
  getAnime: s => s.anime,
  getBanner: s => s.banner,
  getRelated: s => s.related,
  getSimilar: s => s.similar,
  getRoles: s => s.roles,
  getKodik: s => s.kodik,
  getVcdn: s => s.vcdn,
  getScreenshots: s => s.screenshots,
  getComments: s => s.comments
}
