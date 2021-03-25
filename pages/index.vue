<template>
  <div class="">
    <Carousel v-if="carousel.length !== 0" :animes="carousel" />
    <div class="container">
      <div class="search-landing">
        <MiniList
          v-for="(list,id) in lists"
          :key="id"
          :_anime="list.list"
          :section-name="list.title"
          :filter="$store.getters['home/getListsParams'][id]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Home/Carousel'
import MiniList from '@/components/Home/MiniList'
export default {
  components: {
    Carousel,
    MiniList
  },
  async fetch ({ store }) {
    store.commit('setTransparent', true)
    if (!store.getters['home/getLists'].map(e => e.title).includes(store.getters['home/getListsParams'][0].title)) {
      await store.dispatch('home/fetchList', store.getters['home/getListsParams'][0])
    }
  },
  computed: {
    carousel () { return this.$store.getters['home/getCarousel'] },
    lists () { return this.$store.getters['home/getLists'] },
    listsParams () { return this.$store.getters['home/getListsParams'] }
  },
  mounted () {
    this.$store.dispatch('home/fetchCarousel')
    this.$store.commit('setTransparent', true)
    this.get_lists()
  },
  methods: {
    get_lists () {
      this.listsParams.filter(e => !this.lists.map(t => t.title).includes(e.title)).forEach((element) => {
        this.$store.dispatch('home/fetchList', element)
      })
    }
  }
}
</script>

<style>
.search-landing {
    margin-top: -30px;
    position: relative;
}
/* .search-landing .landing-section:nth-child(2n)::after{
    content: '';
    background-color: rgb(var(--color-background-100));
    position: absolute;
    top: 0;
    right: -10vw;
    width: 110vw;
    height: 100%;
}
.search-landing .landing-section:nth-child(2n) {
    padding: 15px 0;
    position: relative;
    margin-bottom: 30px;
}

@media (max-width: 1040px){
    .search-landing .landing-section:nth-child(2n)::after{
        right: 0;
    }
} */
</style>
<style scoped>

@media (max-width: 1040px){
    .container{
        padding: 0 !important;
    }
}
</style>
