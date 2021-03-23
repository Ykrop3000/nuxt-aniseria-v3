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

</style>

<style>
.results {
    display: grid;
    width: 100%;
    grid-gap: 28px 30px;
    grid-template-columns: repeat(auto-fill,185px);
    justify-content: space-between;
    z-index: 5;
    position: relative;
}
.results.chart {
    grid-template-columns: repeat(3,minmax(390px,460px));
    grid-template-rows: repeat(auto-fill,265px);
}
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
@media (max-width: 1540px){
    .results.cover  {
        grid-gap: 25px 20px;
    }
    .results.chart {
        grid-gap: 28px 30px;
        grid-template-columns: repeat(2,minmax(390px,760px));
    }
}
@media (max-width: 1065px){
    .results.cover {
        grid-gap: 25px 14px;
    }
    .results.chart {
        grid-gap: 25px 10px;
    }
}
@media (max-width: 1040px){
    .results.cover {
        padding: 0 20px;
        grid-template-columns: repeat(auto-fill,minmax(125px,1fr));
        grid-gap: 25px 20px;
        justify-content: center;
    }
    .results {
        padding: 0 20px;
        padding-top: 0px;
        padding-right: 20px;
        padding-bottom: 0px;
        padding-left: 20px;
        grid-template-columns: repeat(auto-fill,minmax(125px,1fr));
        grid-gap: 25px 20px;
        justify-content: center;
    }
}
.label {
    color: rgb(var(--color-gray-600));
    font-size: 1.3rem;
    font-weight: 600;
    padding-left: 8px;
    white-space: nowrap;
}

.icon{
    font-size: 1.8rem;
}

@media (max-width: 800px){
    .results.chart {
        grid-template-columns: minmax(390px,760px);
        grid-gap: 25px 20px;
    }
}
@media (max-width: 760px){
    .results.cover {
        grid-template-columns: repeat(auto-fill,minmax(105px,1fr));
        grid-gap: 25px 20px;
    }
}
@media (max-width: 400px){
    .results.cover {
        grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
        grid-gap: 20px 12px;
        padding: 0 10px;
    }
   .results.chart {
        grid-template-columns: 1fr;
        grid-gap: 20px 0;
        padding: 0 10px;
    }
}
</style>
