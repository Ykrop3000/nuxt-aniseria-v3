<template>
  <div class="watch">
    <!-- <div class="select">
      <h2 class="input-title">
        Плеер
      </h2>
      <el-select v-model="player" placeholder="Плеер">
        <el-option
          v-for="(val,key) in players"
          :key="key"
          :label="val.russian"
          :value="val.id"
        />
      </el-select>
    </div> -->
    <client-only>
      <Player v-if="kodik.link && player == 'kodik'" :url="kodik.link" />
      <Player v-if="vcdn && player == 'vcdn'" :url="vcdn.iframe_src" />
    </client-only>
    <div v-if="player == 'onik'" class="player">
      <div id="onik-player" />
    </div>
  </div>
</template>

<script>
import Player from '@/components/FullPage/Player'

export default {
  name: 'Watch',
  components: {
    Player
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
    }
  },
  data () {
    return {

    }
  },
  computed: {
    vcdn () { return this.$store.getters['anime/getVcdn'] },
    player: {
      get () {
        return this.$route.query.player || 'kodik'
      },
      set (val) {
        this.$router.replace({ query: { player: val } })

        return val
      }
    },
    players: {
      get () {
        const data = [
          {
            id: 'kodik',
            name: 'Kodik',
            russian: 'Kodik'
          }
        ]
        if (this.vcdn) {
          data.push({
            id: 'vcdn',
            name: 'VideoCdn',
            russian: 'VideoCdn'
          })
        }
        return data
      }
    }
  },
  watch: {
    kodik (val) {
      if (val.length === 0) { return }
      this.$store.dispatch('anime/fetchVcdn', this.kodik.kinopoisk_id)
    }
  },
  mounted () {
    if (this.kodik.length !== 0) {
      this.$store.dispatch('anime/fetchVcdn', this.kodik.kinopoisk_id)
    }
  }
}
</script>
<style scoped>
iframe {
    border-radius: 4px;
    height: 230px;
    overflow: hidden;
    width: 100%;
}
.player{
    position: relative;
}
.player>iframe{
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.watch>div{
   margin-bottom: 30px;
}

</style>
