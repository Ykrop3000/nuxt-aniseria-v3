<template>
  <div class="media-preview-card" :class="{'small':width>=760}">
    <NuxtLink :lazy-background="url + i.image.preview" :to="i.url" class="cover">
      <div class="image-text">
        <div>{{ i.russian }}</div>
      </div>
    </NuxtLink>

    <div class="content">
      <div class="info-header">
        <div v-text="data.relation_russian" />
      </div>

      <NuxtLink :to="i.url" class="title" v-text="i.russian" />

      <div class="info">
        {{ kind + ' · ' + status }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
   props: {
    data:{
      type: Object,
      default(){
        return {}
      }
    },
    url:{
      type: String,
      default(){
        return ''
      }
    },
    width:{
      type: Number,
      default(){
        return 1040
      }
    }
  },
  computed: {
    i: {
      get () {
        if (!this.data) { return }
        return this.data.anime || this.data.manga
      }
    },
    kind: {
      get () {
        return this.$store.state.kind[this.i.kind]
      }
    },
    status: {
      get () {
        return this.$store.state.statusAnime[this.i.status]
      }
    }
  }
}
</script>

<style scoped>
.cover {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px 0 0 3px;
}
.small .cover{
    background-size: cover;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(var(--color-shadow-blue),.05);
    display: grid;
    grid-template-rows: 1fr auto;
    height: 180px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    transition: box-shadow .2s ease-in-out;
    width: 130px;
}
.content{
    background: rgb(var(--color-foreground));
    border-radius: 0 3px 3px 0;
    padding: 12px;
    position: relative;
}
.info-header{
    color: rgb(var(--color-blue));
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
}
.title{
    display: -webkit-box;
    font-size: 1.4rem;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.info {
    bottom: 12px;
    color: rgb(var(--color-text-lighter));
    font-size: 1.2rem;
    left: 12px;
    position: absolute;
}
.cover .image-overlay, .cover .image-text{
    display: none;
}

.small .cover{
    border-radius: 3px;
    text-align: center;
}
.small .cover .image-text{
    background: rgba(var(--color-overlay),.7);
    border-radius: 0 0 3px 3px;
    bottom: 0;
    color: rgba(var(--color-text-bright),.91);
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 400;
    left: 0;
    letter-spacing: .2px;
    margin-bottom: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    position: absolute;
    transition: .3s;
    width: 100%;
}
.small .cover+.content {
    height: 100%;
    left: 100%;
    position: absolute;
    top: 0;
}
.small .content {
    opacity: 0;
    transition: opacity .3s;
    width: 240px;
    z-index: -1;
}
.small .cover:hover+.content{
    display: block;
    opacity: 1;
    z-index: 9;
}
.small .cover:hover .image-text {
    opacity: 0;
}
.media-preview-card{
    background: rgb(var(--color-foreground));
    border-radius: 3px;
    display: inline-grid;
    grid-template-columns: 85px auto;
    height: 115px;
    max-height: 115px;
}
.media-preview-card.small{
    margin-bottom: 15px;
    margin-right: 20px;
    position: relative;
    width: 130px;
    height: 180px;
    max-height: 180px;
}

@media (max-width: 760px){
    .relations .grid-wrap .media-preview-card {
        margin-right: 25px;
        max-width: 400px;
        min-width: 250px;
        white-space: normal;
    }
}

</style>
