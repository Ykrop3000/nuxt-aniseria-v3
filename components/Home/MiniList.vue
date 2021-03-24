<template>
    <div class="landing-section">
      <NuxtLink :to="{name: 'animes', query:filter.filter}" class="title link">
        <h3 v-text="sectionName" />
        <div class="expand">
          Посмотреть все
        </div>
      </NuxtLink>

      <div class="results cover">
        <MediaCard
          v-for="i in anime"
          :key="i.id"
          :type="type"
          :anime="i"
          :view-mode="0"
          :is-logged-in="isLoggedIn"
        />
      </div>
    </div>
</template>
<script>

import MediaCard from '@/components/MediaCard'

export default {
  components: {
    MediaCard,
  },

  props: {
    sectionName: {
      type: String,
      default () { return '' }
    },
    _anime: {
      type: Array,
      default () { return [] }
    },
    filter: {
      type: Object,
      default () { return {} }
    },
    isLoggedIn: {
      type: Boolean,
      default () { return false }
    },
    type: {
      type: String,
      default () { return 'animes' }
    }
  },
  computed: {
    anime: {
      get () {
        if (this._anime && this._anime.length !== 0) {
          return this._anime
        } else {
          let a = []
          for (let i = 0; i < 6; i++) {
            a = a.concat({})
          }
          return a
        }
      }
    }
  }
}
</script>
<style scoped>

.landing-section{
    margin-bottom: 50px;
}
.landing .title {
    z-index: 5;
    position: relative;
}
.link{
    align-items: flex-end;
    display: flex;
}
.title{
    color: rgb(var(--color-gray-800));
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: .03em;
    text-transform: uppercase;
    margin-bottom: 20px;
}
.title h3{
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
    z-index: 10;
}
.link .expand{
    color: rgb(var(--color-gray-600));
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: auto;
    text-transform: none;
    transition: color .2s ease;
    z-index: 10;
}
@media (max-width: 1040px){
    .title{
        padding: 0 20px;
    }
}
@media (max-width: 890px) and (min-width: 520px){
    .results .media-card:nth-child(n+6){
        display: none;
    }
}
@media (max-width: 644px) and (min-width: 520px){
    .results .media-card:nth-child(n+5){
        display: none;
    }
}
</style>
