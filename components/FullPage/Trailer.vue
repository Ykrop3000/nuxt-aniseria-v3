<template>
  <div class="trailer">
    <h2>Трейлер</h2>
    <iframe :src="trailer" frameborder="0" allowfullscreen="allowfullscreen" class="video" />
  </div>
</template>
<script>
export default {
  props: {
    trailer: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>
<style scoped>
.video {
    border-radius: 4px;
    height: 230px;
    overflow: hidden;
    width: 100%;
}
.trailer{
    position: relative;
    padding-bottom: 56.2%;
}
.trailer>iframe{
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>
