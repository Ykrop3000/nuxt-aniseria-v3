<template>
  <VueSlickCarousel
    v-if="animes.length !==0"
    class="carousel"
    :arrows="true"
    :dots="false"
    :lazy-load="'ondemand'"
    :slides-to-show="1"
    :slides-to-scroll="1"
    :infinite="true"
    :speed="500"
    :autoplay="true"
    :autoplay-speed="15000"
    @init="getBanner"
    @lazyLoadError="getBanner"
    @lazyLoad="getBanner"
  >
    <NuxtLink
      v-for="(i,id) in animes.filter(e => !e.dis)"
      :key="id"
      no-prefetch
      class="slide container"
      :to="i.url"
    >
      <div class="img" :style="{'background-image': `url(${i.image.preview })`}" alt="slide" />
      <div class="details">
        <h1 class="title" v-text="i.russian" />
      </div>
    </NuxtLink>
  </VueSlickCarousel>
</template>

<script>

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import gql from 'graphql-tag'

export default {
  name: 'Carousel',
  components: {
    VueSlickCarousel
  },
  props: {
    animes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      graphqlClient: this.$apolloProvider.defaultClient
    }
  },
  mounted () {

  },
  methods: {
    getBanner (i) {
      if (this.animes.length === 0 || !this.animes[i]) { return }

      this.graphqlClient.query({
        query: gql`
                query ($search: String) {
                    Media(search: $search, type: ANIME) {
                        id
                        bannerImage
                    }
                }
            `,
        variables: { search: this.animes[i].name }
      }).then((resp) => {
        this.$store.commit('home/setImageCarousel', { key: i, val: resp.data.Media.bannerImage })
      })
    }

  }

}
</script>

<style>
.slick-slider{
    margin-bottom: 60px;
}
button.slick-arrow.slick-prev{
    position: absolute;
    z-index: 1000;

    left: 0;
    width: 5vw;
    bottom: 0;
    cursor: pointer;
    opacity: 1;
    transition: all .15s ease-out;
}
button.slick-arrow.slick-next{
    position: absolute;
    z-index: 1000;
    right: 0;
    width: 5vw;
    bottom: 0;
    cursor: pointer;
    opacity: 1;
    transition: all .15s ease-out;
}
.slick-prev:before{
    content: "\276E" ;
    position: absolute;
    top: 50%;
    color: #fff;
    font-size: 30px !important;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    transform-origin: inherit;
    z-index: 1;
    transition: all .15s ease-out;
}
.slick-next:before{
    content: "\276F" ;
    position: absolute;
    top: 50%;
    color: #fff;
    font-size: 30px !important;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    transform-origin: inherit;
    z-index: 1;
    transition: all .15s ease-out;
}
</style>

<style scoped>
.carousel .slide{
    position: relative;
    height: calc((4 / 19) * 100vw);
    min-height: 25vh;
}
 .carousel .img{
    background-color:rgb(var(--color-background-100));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all .15s ease-out;
 }
 .details {
    transition: all .15s ease-out;
    background-color: transparent;
    align-self: flex-end;
    z-index: 2;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
}
.title{
    font-size: 18px;
    line-height: 18px;
    text-shadow: 3px 3px 4px rgb(0 0 0 / 30%);
    margin-bottom: 0;
    color: #fff;
    max-width: 90%;
}
@media only screen and (min-width: 768px){
    .details {
        width: auto;
        max-width: 50%;
        text-align: left;
        vertical-align: bottom;
    }
   .title {
        font-size: 35px;
        line-height: 35px;
        margin-bottom: 10px;
        max-width: 100%;
    }
}
@media only screen and (min-width: 1200px){

    .title {
        font-size: 60px;
        line-height: 50px;
        margin-bottom: 10px;
        max-width: 100%;
    }
}
</style>
