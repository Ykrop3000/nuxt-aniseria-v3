<template>
  <div class="relations">
    <h2>Связанные</h2>

    <Spinner v-if="related.length == 0" />

    <div v-else :class="{'grid-wrap':width<760}">
      <Card v-for="(i, id) in related" :key="id" :data="i" :url="shikiUrl" :width="width" />
    </div>
  </div>
</template>

<script>

import Card from './RelatedCard'
const Spinner = () => import('../SpinnerItem')

export default {
  name: 'Related',
  components: {
    Spinner,
    Card
  },
  props: {
    related:{
      type: Array,
      default(){
        return []
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
    shikiUrl () { return this.$store.getters.getShikiUrl }
  }
}
</script>
