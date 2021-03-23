<template>
  <div id="app">
    <client-only>
      <Header v-show="$vssWidth >= 1040" :transparent="transparent" :is-logged-in="false" />
      <MobileNav v-show="$vssWidth < 1040" />
    </client-only>
    <div ref="content" class="page-content" @click="linkRouter">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import MobileNav from '@/components/MobileNav'
export default {
  components: {
    Header,
    MobileNav
  },
  computed: {
    transparent () { return this.$nuxt.$store.getters.getTransparent },
    theme () { return this.$nuxt.$store.getters.getTheme }
  },
  watch: {
    theme (v) {
      this.changeTheme(v)
    }
  },
  mounted () {
    this.changeTheme(this.theme)
  },
  methods: {
    changeTheme (v) {
      if (v !== 'light') {
        this.toggleBodyClass('addClass', 'site-theme-dark')
      } else {
        this.toggleBodyClass('removeClass', 'site-theme-dark')
      }
    },
    toggleBodyClass (addRemoveClass, className) {
      const el = document.body

      if (addRemoveClass === 'addClass') {
        el.classList.add(className)
      } else {
        el.classList.remove(className)
      }
    },
    spoler (event) {
      const target = event.target.parentElement
      if (target.dataset.dynamic === 'spoiler_block') {
        target.classList.toggle('open')
      }
    },
    linkRouter (event) {
      this.spoler(event)
      const target = event.target.closest('a')
      if (!target) { return }
      if (!target.dataset.attrs) { return }
      event.preventDefault()
      const attrs = JSON.parse(target.dataset.attrs)

      if (attrs.type === 'character' || attrs.type === 'person') {
        this.$router.push({ name: 'charapter-id', params: { id: attrs.id } })
      }
      if (attrs.type === 'anime') {
        this.$router.push({ name: 'animes-id', params: { slug: attrs.id } })
      }
    }
  }
}
</script>

<style>

</style>
