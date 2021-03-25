<template>
  <div class="screenshots-wrapp">
    <h2>Кадры</h2>
    <div class="screenshots results cover">
      <div
        v-for="(src, index) in images"
        :key="index"
        class="media-card"
        @click="() => showImg(index)"
      >
        <div class="cover">
          <img class="image" :src="shikiUrl+src.preview">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {

  },
  props: ['anime'],
  data () {
    return {
      visible: false,
      index: 0
    }
  },
  computed: {
    shikiUrl () { return this.$store.getters.getShikiUrl },
    images () { return this.$store.getters['anime/getScreenshots'] }
  },
  mounted () {
    this.$store.dispatch('anime/fetchScreenshots', this.$route.params.id)
  },
  methods: {
    showImg (index) {
      this.index = index
      this.visible = true
    },
    handleHide () {
      this.visible = false
    }
  }

}
</script>

<style scoped>
.image.isLoaded{
  opacity: 1;
}
.media-card{
  min-height: 100px;
}
.cover{
  position: relative;
  height: 100%;
}
</style>
