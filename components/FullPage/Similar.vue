<template>
  <div>
    <h2 v-text="title" />

    <Spinner v-if="similar.length == 0" />

    <div class="wrap">
      <NuxtLink v-for="i in similar" :key="i.id" :to="i.url" class="recommendation-card">
        <div :lazy-background="shikiUrl + i.image.preview" class="cover" />

        <NuxtLink :to="i.url">
          <div class="title" v-text="i.russian" />
        </NuxtLink>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
const Spinner = () => import('../SpinnerItem')

export default {
  name: 'Similar',
  components: {
    Spinner
  },
  props: {
    similar: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default () {
        return 'Похожие'
      }
    },
    type: {
      type: String,
      default () {
        return 'anime'
      }
    }
  },
  computed: {
    shikiUrl () { return this.$store.getters.getShikiUrl }
  }

}
</script>

<style scoped>
.wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill,130px);
    grid-gap: 20px;
    justify-content: space-between;
    max-height: 1000px;
    overflow-x: auto;
}
.recommendation-card{
    max-width: 100%;
    vertical-align: top;
    width: 130px;
}
.cover{
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
.title {
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 140%;
    white-space: normal;
}
.recommendation-card:hover .cover{
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.3),0 4px 4px rgba(var(--color-shadow-blue),.05);
}
h2{
    margin-bottom: 15px;
    display: flex;
    justify-content: start;
}
a:hover {
    color: rgb(var(--color-blue));
}
a:visited:hover {
    color: rgb(var(--color-blue));
}
@media (max-width: 760px){
    .wrap {
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        grid-auto-flow: column;
    }
}
</style>
