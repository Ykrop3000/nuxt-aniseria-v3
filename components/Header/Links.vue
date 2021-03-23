<template>
  <div class="links" :class="{'LoggedIn':isLoggedIn}">
    <NuxtLink
      v-for="i in nav"
      :key="i.text"
      :to="i.to"
      class="link"
      :class="i.class"
      v-text="i.text"
    />
  </div>
</template>
<script>
export default {
  props: [
    'isLoggedIn'
  ],
  computed: {
    nav () { return this.$store.state.nav }
  }
}
</script>
<style scoped>
.links{
    align-items: center;
    display: inline-flex;
    font-size: 1.4rem;
    font-weight: 600;
    justify-content: center;
    text-transform: capitalize;
    width: 100%;
    height: 100%;
}
.LoggedIn .login, .LoggedIn .signup{
    display: none;
}
.link{
    letter-spacing: .01em;
    padding: 18px 16px;
}
.link:hover {
    color: #d3d5f3;
}
.login {
    margin-left: 70px;
    padding-right: 24px;
}
.signup{
    background: #3577ff;
    border-radius: 6px;
    box-shadow: 0 0 0 rgba(8,150,230,.6);
    color: rgb(var(--color-white));
    font-size: 1.4rem;
    font-weight: 800;
    margin-right: -70px;
    padding: 10px 15px;
    transition: box-shadow .6s ease,transform .2s ease-in-out;
}
</style>
