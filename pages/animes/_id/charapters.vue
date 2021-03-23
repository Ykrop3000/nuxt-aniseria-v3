<template>
  <div class="characters">
    <Roles v-if="roles" :roles="roles.filter(r => r.roles[0] === 'Main')" :title="'Главные герои'" />
    <Roles v-if="roles" :roles="roles.filter(r => r.roles[0] != 'Main')" :title="'Второстепенные герои'" />
  </div>
</template>

<script>

import Roles from '@/components/FullPage/Roles'

export default {
  name: 'Characters',
  components: {
    Roles
  },
  props: {
    anime: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    roles () { return this.$store.getters['anime/getRoles'] }
  },
  mounted () {
    this.$store.dispatch('anime/fetchRoles', { id: this.anime.id, type: 'animes' })
  }
}
</script>

<style scoped>
.characters>div {
    margin-bottom: 30px;
}

.characters .content-wrap {
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    font-size: 1.4rem;
    padding: 20px;
}

.characters>div {
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
