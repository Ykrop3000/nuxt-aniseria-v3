<template>
  <div class="container">
    <h1 v-show="$vssWidth>=1040" class="alias-title" v-text="'Список аниме'" />
    <div v-show="$vssWidth<1040" class="wrap">
      <div class="mobile-header" v-text="'Список аниме'" />
    </div>

    <div class="f-paceholder" />
    <div class="fs-paceholder" />

    <client-only>
      <Filters />
      <SecondaryFilters />
    </client-only>
    <div v-show="status === 'error'" class="not-found">
      Ничего не найдено
    </div>
    <div v-show="status !== 'error'" v-infinite-scroll="handleScroll" class="results cover">
      <MediaCard
        v-for="anime in animes"
        :key="anime.id"
        :anime="anime"
        :is-logged-in="isLoggedIn"
        :type="$attrs.full"
      />
    </div>
  </div>
</template>

<script>

import MediaCard from '@/components/MediaCard'

export default {
  components: {
    MediaCard,
    Filters: () => import('@/components/Filters'),
    SecondaryFilters: () => import('@/components/SecondaryFilters')
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      page: 1,
      ViewMode: 0
    }
  },
  async fetch ({ store, route }) {
    store.commit('setTransparent', false)
    const params = {
      page: 1,
      type: 'animes',
      order: route.query.order || 'popularity',
      search: route.query.search,
      genres: route.query.genre,
      kind: route.query.kind,
      status: route.query.status,
      season: route.query.season
    }
    await store.dispatch('animes/fetchAnimes', params)
  },
  head () {
    return {
      title: 'Список аниме | AniSeria'
    }
  },
  computed: {
    animes () {
      if (this.$store.getters['animes/getAnimes'].length !== 0) {
        return this.$store.getters['animes/getAnimes']
      } else {
        let a = []
        for (let i = 0; i < 24; i++) {
          a = a.concat({})
        }
        return a
      }
    },
    status () {
      return this.$store.getters['animes/getStatus']
    }
  },

  watch: {
    '$route.query' () {
      this.get_animes(true, 1)
    }
  },
  mounted () {
    this.$store.commit('setTransparent', false)
  },
  methods: {

    get_animes (update = false, getPage) {
      let page = 0

      if (this.$store.getters['animes/getAnimes'].length === 0) {
        update = true
      }

      if (this.animes) {
        page = Math.ceil(this.animes.length / 24) + 1
      } else {
        page = 1
      }

      if (update) {
        const params = {
          page: getPage || page,
          type: 'animes',
          order: this.$route.query.order || 'popularity',
          search: this.$route.query.search,
          genres: this.$route.query.genre,
          kind: this.$route.query.kind,
          status: this.$route.query.status,
          season: this.$route.query.season
        }
        this.$store.dispatch('animes/fetchAnimes', params)
      }
    },

    handleScroll () {
      if (this.status === 'success') {
        this.get_animes(true)
      }
    }

  }
}
</script>

<style scoped>
@media (max-width: 1040px){
    .container{
        padding: 0 !important;
    }
}
.f-paceholder, .fs-paceholder{
    background: rgba(var(--color-background-300),.8);
    box-shadow: none;
    opacity: 1;
    overflow: hidden;
}
.f-paceholder{
    border-radius: 4px;
    height: 76px;
    margin: 40px 0;
    margin-bottom: 25px;
    width: auto;
}
.fs-paceholder{
    border-radius: 4px;
    margin-bottom: 30px;
    min-height: 23px;
    width: auto;
}
.f-paceholder::before, .fs-paceholder::before{
  animation: loading-pulse 2s linear infinite;
  background: linear-gradient(90deg,rgba(var(--color-gray-300),0) 0,rgba(var(--color-blue-700),.06) 40%,rgba(var(--color-blue-700),.06) 60%,rgba(var(--color-gray-300),0));
  content: "";
  display: block;
  height: 100%;
  transform: translateX(0);
  width: 200%;
}
@media (max-width: 1040px){
  .fs-paceholder, .f-paceholder{
    margin-left: 20px;
    margin-right: 20px;
  }
  .f-paceholder{
    height: 42px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

}
.filters-loaded .fs-paceholder,.filters-loaded .f-paceholder{
  display: none;
}
.icon{
    font-size: 1.8rem;
}

</style>

<style>

.alias-title{
    font-size: 2.8rem;
    color: rgb(var(--color-gray-800));
    font-weight: 800;
    margin-bottom: -45px;
    margin-top: 35px;
    padding-bottom: 30px;
    text-transform: capitalize;
}
.mobile-header{
    cursor: pointer;
    display: inline-block;
    font-size: 3.2rem;
    font-weight: 900;
    letter-spacing: .01em;
    padding: 25px 20px;
    padding-bottom: 0;
}
.not-found{
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 1.8rem;
}

.label {
    color: rgb(var(--color-gray-600));
    font-size: 1.3rem;
    font-weight: 600;
    padding-left: 8px;
    white-space: nowrap;
}

</style>
