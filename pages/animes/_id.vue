<template>
  <div
    v-infinite-scroll="handleScroll"
    class="media media-page-unscoped media-anime"
  >
    <!-- <SetRates
            :poster="poster"
            :bigPoster="`url(${BANNER})`"
            :triger="listDilog"
            :anime="anime"
            :isLoggedIn="isLoggedIn"
            :user="user"
            v-if="listDilog"
            @set_triger="listDilog_triger"
        /> -->

    <div class="header-wrap" :class="{'loading': !anime.id}">
      <div class="banner" :style="{'background-image':`url(${banner})`}">
        <div class="shadow" />
      </div>
      <div class="header">
        <div class="container">
          <div class="cover-wrap overlap-banner">
            <div class="cover-wrap-inner">
              <img :src="poster" alt="poter" class="cover">
              <div class="actions">
                <div class="list">
                  <div class="add" @click="listDilog = true">
                    Добавить в список
                  </div>
                </div>
                <div class="favourite" :class="{'isFavourite': anime.favoured}" @click="setfavorite">
                  <i class="fas fa-heart" />
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <h1 v-text="anime.russian" />
            <p v-if="anime.description_html" class="description" :class="{'full': des}" v-html="anime.description_html.replace('https://shikimori.one','')" />

            <div class="nav">
              <NuxtLink no-prefetch :to="{name:'animes-id',params:{id:$route.params.id}}" replace class="link">
                Обзор
              </NuxtLink>
              <NuxtLink v-if="!anime.anons && $attrs.type != 'mangas'" no-prefetch :to="{name:'animes-id-watch',params:{id:$route.params.id}}" replace class="link">
                Просмотр
              </NuxtLink>
              <NuxtLink v-if="!anime.anons && $attrs.type != 'mangas'" no-prefetch :to="{name:'animes-id-charapters',params:{id:$route.params.id}}" replace class="link">
                Персонажи
              </NuxtLink>
              <NuxtLink v-if="!anime.anons && $attrs.type != 'mangas'" no-prefetch :to="{name:'animes-id-frames',params:{id:$route.params.id}}" replace class="link">
                Кадры
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content container">
      <Sidebar :anime="anime" />
      <keep-alive>
        <NuxtChild :anime="anime" :kodik="kodik" :type="$attrs.link" />
      </keep-alive>
    </div>

    <client-only>
      <Comments v-if="comments_render && anime.topic_id" :id="anime.topic_id" :render="comments_render" :is-logged-in="isLoggedIn" />
    </client-only>
  </div>
</template>

<script>

import Sidebar from '@/components/FullPage/Sidebar'

const Comments = () => import('@/components/FullPage/Comments.vue')
// const SetRates = () => import('@/components/SetRates.vue')

export default {
  name: 'Single',
  components: {
    Comments,
    // SetRates,
    Sidebar
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      default () {
        return false
      }
    },
    user: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  async asyncData ({ store, params }) {
    const type = 'animes'
    store.commit('setTransparent', true)
    await store.dispatch('anime/fetchAnime', { slug: params.id, type })
  },
  data () {
    return {
      listDilog: false,
      comments_render: false,
      des: false
    }
  },
  head () {
    return {
      title: `${this.anime.russian} / ${this.anime.name} | AniSeria`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.anime.description
      }
      ]
    }
  },
  computed: {
    anime () { return this.$store.getters['anime/getAnime'] },
    kodik () { return this.$store.getters['anime/getKodik'] },
    banner () { return this.$store.getters['anime/getBanner'] },

    poster: {
      get () {
        if (this.anime.image) {
          return this.$store.getters.getShikiUrl + this.anime.image.original
        } else {
          return ''
        }
      },
      set (val) {
        return val
      }
    }

  },
  watch: {
    '$route.params.slug' () {
      this.$store.commit('setTransparent', true)
      this.$store.dispatch('anime/clearAnime')
      this.poster = ''
      this.get_page()
    }
  },
  mounted () {
    this.Init()
    this.$store.commit('setTransparent', true)
  },

  methods: {
    Init () {
      this.$store.commit('setTransparent', true)
      if (this.anime.id) {
        this.$store.dispatch('anime/fetchBanner', this.anime.english[0] || this.anime.japanese[0])
        this.$store.dispatch('anime/fetchKodik', this.anime.id)
      }
    },
    setfavorite () {
      // if (this.isLoggedIn) {
      //   this.SET_FAVORITES({ id: this.anime.id, type: this.anime.favoured })
      // } else {
      //   this.$message.error('Для этого действия тебе необходима регистрация на сайте.')
      // }
    },
    handleScroll () {
      this.comments_render = true
    },
    listDilog_triger (v) {
      this.listDilog = v
    },
    get_page () {
      const type = this.$attrs.type || 'animes'

      this.$store.dispatch('anime/fetchAnime', {
        slug: this.$route.params.id,
        type
      })
    }
  }
}
</script>

<style scoped>
.loading .content .description, .loading .content h1{
    background: rgba(var(--color-background-300),.8);
    box-shadow: none;
    opacity: 1;
    overflow: hidden;
    height: 100%;
    border-radius: 4px;
}
.loading .content .description{
    padding: 0 !important;
    margin-top: 15px;
}
.loading .content .description::before, .loading .content h1::before{
    animation: loading-pulse-data-v-758c163c 2s linear infinite;
    background: linear-gradient(90deg,rgba(var(--color-gray-300),0) 0,rgba(var(--color-blue-700),.06) 40%,rgba(var(--color-blue-700),.06) 60%,rgba(var(--color-gray-300),0));
    content: "";
    display: block;
    height: 100%;
    transform: translateX(0);
    width: 200%;
}
.outline.isFavourite{
    color: rgb(var(--color-red));
}
.favourite.isFavourite{
    color: #ffaebc;
}
.outline{
    background: 0 0;
    color: rgb(var(--color-white));
    font-size: 1.6rem;
    opacity: .9;
}

.media{
    display: block;
}
.header-wrap{
    position: relative;
    z-index: 997;
}
.container.content {
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: 208px auto;
    margin-top: 30px;
    position: relative;
}
.banner{
    background-position: 50% 35%;
    background-color: rgba(31,40,53,.65);
    background-repeat: no-repeat;
    background-size: cover;
    height: 400px;
}

.description-length-toggle{
    background: linear-gradient(0deg,rgb(var(--color-foreground)) 30%,rgba(var(--color-foreground),.4));
    color: rgb(var(--color-text-lighter));
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: -50px;
    max-width: 900px;
    opacity: 0;
    padding-bottom: 5px;
    padding-top: 20px;
    text-align: center;
    transition: .2s;
}
.description-length-toggle:hover {
    opacity: 1;
}
.nav .link {
    padding: 15px;
    color: rgb(var(--color-text-lighter));
}
.nav .link:hover {
    color: rgb(var(--color-blue));
}
.nav .router-link-active {
    color: rgb(var(--color-text));
}
.description{
    color: rgb(var(--color-text-light));
    font-size: 1.4rem;
    line-height: 1.5;
    margin: 0;
    max-width: 900px;
    padding: 15px 0;
    transition: .2s;
}
.banner .shadow{
    background: linear-gradient(180deg,rgba(var(--color-shadow-dark),0) 40%,rgba(var(--color-shadow-dark),.6));
    height: 100%;
    width: 100%;
}
.header{
    background: rgb(var(--color-foreground));
    position: relative;
}
.header .container{
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: 215px auto;
}
.cover-wrap.overlap-banner {
    margin-top: -125px;
}
.cover-wrap {
    position: relative;
}
.actions{
    display: grid;
    grid-template-columns: auto 35px;
    margin-bottom: 20px;
    margin-top: 20px;
    grid-gap: 15px;
}
.cover {
    background-color: rgba(212,230,245,.5);
    border-radius: 2px;
    box-shadow: 0 0 29px rgba(49,54,68,.25);
    margin-top: 23px;
    width: 100%;
    min-height: 140px;
}
.header .cover img{
    opacity: 0;
}
.favourite{
    align-items: center;
    background: rgb(var(--color-red-400));
    border-radius: 5px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: flex;
    font-size: 1.4rem;
    font-weight: 800;
    height: 35px;
    justify-content: center;
    padding-left: 1px;
    transition: .2s;
    padding: 0 14px;
}
.favourite.isFavourite{
    color: #ffaebc;
}
.list {
    align-items: center;
    background: rgb(var(--color-blue));
    border-radius: 3px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: flex;
    font-size: 1.4rem;
    height: 35px;
    justify-content: center;
    line-height: 1.3rem;
}
.list .add {
    align-items: center;
    text-align: center;
    display: flex;
    height: 100%;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    width: calc(100% - 34px);
}
.nav{
    align-self: end;
    display: flex;
    font-size: 1.5rem;
    justify-content: space-evenly;
    justify-self: center;
    max-width: 800px;
    padding-top: 10px;
    width: 100%;
}

.header .content {
    display: inline-grid;
    grid-template-rows: -webkit-min-content -webkit-min-content auto;
    grid-template-rows: min-content min-content auto;
    padding-top: 25px;
}
@media (max-width: 760px){
    .container.content {
        display: block;
    }
    .banner{
        height: 210px;
        margin-top: 0;
    }
    .header .container{
        grid-template-columns: 1fr;
    }
    .cover-wrap.overlap-banner, .cover-wrap {
        margin-top: -110px;
    }
    .cover-wrap-inner{
        display: grid;
        grid-template-columns: 100px auto;
        grid-gap: 20px;
        align-items: flex-end;
    }
    .cover {
        max-width: 100px;
    }
    .description{
        display: none;
    }
    .description-length-toggle{
        display: none;
    }
    .actions{
        margin-bottom: 0;
    }
    .actions .list .add {
        padding-left: 0;
    }
    .nav {
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        width: auto;
        justify-self: unset;
        justify-content: unset;
    }
    .container h1 {
        font-size: 1.8rem;
        font-weight: 500;
    }
}

@media (max-width: 1040px){
    .container {
        padding-left: 20px !important;
        padding-right: 20px !important;
    }
}
</style>
