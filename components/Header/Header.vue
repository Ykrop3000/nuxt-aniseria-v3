<template>
  <div id="nav" class="nav" :class="{'hide':hide,'transparent':transparent && tr}" style="transition: background 0.8s ease 0s, top 0.5s ease 0s;">
    <div class="wrap">
      <NuxtLink to="/" class="logo">
        <img src="/logo.svg" alt="logo">
        <div class="name">
          <span>Ani</span>
          <span>Seria</span>
        </div>
      </NuxtLink>
      <Links :is-logged-in="isLoggedIn" />
      <!-- <Search v-if="isLoggedIn" />
      <User v-if="isLoggedIn" /> -->
    </div>
  </div>
</template>

<script>

import Links from './Links'
// import User from './User'
// import Search from './Search'

export default {
  components: {
    Links
    // User,
    // Search
  },
  props: [
    'isLoggedIn',
    'transparent'
  ],
  data () {
    return {
      hide: false,
      tr: true,
      lastScrollTop: 0

    }
  },

  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    updateScroll () {
      const st = window.pageYOffset || document.documentElement.scrollTop

      if (st <= 20) {
        this.tr = true
      } else {
        this.tr = false
      }

      if (st < this.lastScrollTop) {
        this.hide = false
      } else {
        this.hide = true
      }

      this.lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
    }
  }

}
</script>

<style scoped>

.logo .name{
    display: none;
}

.logo img {
    height: 50px;
    width: 50px;
}
.logo{
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: bold;
}
.logo span{
    color: white;
}
.logo span:last-child{
    color: rgb(var(--color-blue));
}
.wrap {
    align-items: center;
    display: flex;
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
    max-width: 1050px;
    width: 100%;
}
.nav{
    background: #2b2d42;
    color: #bcbedc;
    display: flex;
    height: 75px;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    transition: background .8s ease,color .2s;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    z-index: 999;
}
.transparent{
    background: rgba(35,38,67,.5);
    color: #e5e7ea;
}
@media (max-height: 920px){
    .nav{
        height: 68px;
    }
}
.hide {
    top: -97px;
}
.solid, .transparent:hover {
    background: #2b2d42;
    color: #bcbedc;
}
</style>
