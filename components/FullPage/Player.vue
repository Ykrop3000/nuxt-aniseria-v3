<template>
  <div class="trailer">
    <iframe :src="url" frameborder="0" allowfullscreen="true" class="video" />
  </div>
</template>
<script>
export default {
  props: {
    url:{
      type: String,
      default(){
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
    padding-bottom: 56%;
}
.trailer>iframe{
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>
