<template>
  <div class="mobile-nav guest">
    <!--:class="{'guest':!isLoggedIn}"-->
    <div class="hamburger" :class="{'dpn':visible}" @click="visible = true">
      <i class="fa-bars fas" />
    </div>
    <div class="menu" :class="{'visible':visible,'login':isLoggedIn}">
      <NuxtLink
        v-for="i in nav"
        :key="i.text"
        :to="i.to"
        :class="i.auth"
        class="link"
      >
        <i :class="i.svg" />
        <span class="label" @click="visible = false" v-text="i.text" />
      </NuxtLink>

      <!-- <NuxtLink v-if="isLoggedIn" class="link" :to="{name: 'User', params:{username: USER.nickname}}">
        <i class="fa-user fas" />
        <span class="label">Профиль</span>
      </NuxtLink> -->

      <!-- <NuxtLink v-if="isLoggedIn" class="secondary-link" :to="{name: 'Logout'}">
        <i class="fa-sign-out-alt fas" />
        <span class="label">Выйти</span>
      </NuxtLink> -->

      <div class="secondary-link" @click="change_theme">
        <i v-if="!dark" class="fas fa-moon" />
        <i v-else class="fas fa-sun" />
        <span class="label">Тема</span>
      </div>

      <div class="close" @click="visible = false">
        <i class="fa-times fas" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      default () {
        return false
      }
    },
    dark: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    nav () { return this.$store.state.nav }
  },
  methods: {
    change_theme () {
      this.$store.dispatch('changeTheme')
    }
  }
}
</script>

<style scoped>
.label{
    text-transform: lowercase;
}
.login .nli{
    display: none;
}
.mobile-nav {
    -webkit-tap-highlight-color: transparent;
    bottom: 25px;
    cursor: pointer;
    position: fixed;
    right: 20px;
    transition: .2s;
    z-index: 99999;
    font-weight: 700;
}
.hamburger {
    align-items: center;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 50px;
    position: relative;
}
.hamburger.dpn{
    display: none !important;
}
.menu{
    align-items: center;
    color: rgb(var(--color-gray-600));
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    height: 0;
    justify-items: center;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    position: relative;
    text-align: center;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 0;
}
.menu i{
    max-height: 2.1rem;
    font-size: 2rem;
    height: auto;
}
.menu .close i{
    height: auto;
    width: 1.466rem;
}
.menu.visible{
    transition: .2s ease;
    pointer-events: auto;
    opacity: 1;
    height: 210px;
    width: 210px;
    padding: 8px;
}
.hamburger, .menu{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 1px 20px rgba(43,50,88,.3);
}
.hamburger i {
    color: rgb(var(--color-blue));
    width: 50%;
    height: auto;
    font-size: 3rem;
}
.label {
    color: rgb(var(--color-gray-600));
    display: block;
    font-size: 1rem;
    padding-top: 8px;
    padding-left: 0;
}
.guest .menu.visible{
    height: 150px;
}
.guest .menu{
    height: 0;
    grid-template-rows: repeat(2,1fr);
}
</style>
