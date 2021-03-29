<template>
  <div class="overview">
    <div v-if="anime.description" class="description-wrap">
      <h2>Описание</h2>
      <div class="description content-wrap" v-html="anime.description_html.replace('https://shikimori.one','')" />
    </div>

      <Related v-if="related" :width="$vssWidth" :related="related" :class="{'small':$vssWidth>=1040}" :type="type" />

      <Roles v-if="roles" :roles="roles" :title="'Главные герои'" />

      <Stats :statuses="anime.rates_statuses_stats" />

      <!-- <Screenshots v-if="anime.screenshots" :images="anime.screenshots"/> -->
      <Trailer v-if="trailer" :trailer="trailerl_url" />

      <Similar v-if="similar" :similar="similar" :type="type" />

  </div>
</template>

<script>
const Trailer = () => import('@/components/FullPage/Trailer')
// const Screenshots = () => import('@/views/FullPage/components/Screenshots')
const Related = () => import('@/components/FullPage/Related')
const Roles = () => import('@/components/FullPage/Roles')
const Similar = () => import('@/components/FullPage/Similar')
const Stats = () => import('@/components/FullPage/Stats')

export default {
  name: 'Overview',
  components: {
    Trailer,
    // Screenshots,
    Related,
    Roles,
    Similar,
    Stats
  },
  props: {
    anime: {
      type: Object,
      default () {
        return {}
      }
    },
    kodik: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    _related () { return this.$store.getters['anime/getRelated'] },
    _roles () { return this.$store.getters['anime/getRoles'] },
    _similar () { return this.$store.getters['anime/getSimilar'] },

    trailerl_url: {
      get () {
        if (this.trailer.player_url) {
          return `https:${this.trailer.player_url.split(':')[1]}`
        }
        return ''
      }
    },
    roles: {
      get () {
        if (this._roles) {
          return this._roles.filter(r => r.roles[0] === 'Main')
        } else {
          return []
        }
      }
    },
    trailer: {
      get () {
        if (this.anime.videos) {
          return (this.anime.videos.filter(v => v.hosting === 'youtube').length === 0) ? false : this.anime.videos.filter(v => v.hosting === 'youtube')[0]
        } else {
          return false
        }
      }
    },
    related: {
      get () {
        if (this._related) {
          return (this._related.length === 0) ? false : this._related
        } else {
          return false
        }
      }
    },
    similar: {
      get () {
        if (this._similar) {
          return (this._similar.length === 0) ? false : this._similar
        } else {
          return false
        }
      }
    }
  },
  mounted () {
    const type = 'animes'
    this.$store.dispatch('anime/fetchRoles', { id: this.anime.id, type })
    this.$store.dispatch('anime/fetchRelated', { id: this.anime.id, type })
    this.$store.dispatch('anime/fetchSimilar', { id: this.anime.id, type })
  }
}
</script>

<style>
.relations.small{
    margin-bottom: 10px;
    overflow: hidden;
}
 .grid-wrap {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 15px;
    grid-template-columns: repeat(3,1fr);
}

@media (max-width: 1540px){
     .grid-wrap {
        grid-template-columns: repeat(2,1fr);
    }
}
@media (max-width: 1040px){
    .grid-wrap {
        grid-template-columns: repeat(1,1fr);
    }
}
@media (max-width: 760px){
    .relations .grid-wrap{
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        display: block;
    }
}

</style>

<style scoped>
.overview>div {
    margin-bottom: 30px;
}
.description-wrap {
    display: none;
}
.overview .content-wrap {
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    font-size: 1.4rem;
    padding: 20px;
}

.overview>div {
    margin-bottom: 30px;
}
@media (max-width: 760px){
    .description-wrap {
        display: block;
    }
    .button, .external-links, .rankings, .tags {
        display: none;
    }

    .button, .external-links .rankings, .tags {
        display: none;
    }

    .description-wrap {
        display: block;
    }
}
</style>
