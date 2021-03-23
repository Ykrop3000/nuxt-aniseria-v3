<template>
  <div class="user ">
    <div class="user-wrap">
      <div class="avatar" :style="{'background-image': `url(${USER.avatar})`}" />
      <i class="chevron fas fa-chevron-down" />
      <div class="dropdown">
        <div class="primary-links">
          <router-link class="primary-link" :to="{name: 'User', params:{username:USER.nickname}}">
            <i class="fa-user icon fas" />
            <div class="label">
              Профиль
            </div>
          </router-link>

          <router-link class="primary-link" :to="{name: 'Settings', params:{username:USER.nickname}}">
            <i class="fa-cog icon fas" />
            <div class="label">
              Настройки
            </div>
          </router-link>
        </div>

        <div class="footer">
          <router-link class="secondary-link" :to="{name: 'Logout'}">
            <i class="fa-sign-out-alt icon fas" />
            Выйти
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['USER']),
    ...mapGetters(['APIURL'])
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.browse-wrap, .user-wrap{
    position: relative;
}
.user .avatar{
    background-size: cover;
    border-radius: 3px;
    height: 38px;
    width: 38px;
    transition: .8s;
}
.user .chevron{
    color: #777a9e;
    font-size: 1.2rem;
    left: 45px;
    opacity: .5;
    position: absolute;
    top: 14px;
    transition: opacity .3s ease;
}
.browse-wrap:hover .dropdown, .user-wrap:hover .dropdown {
    animation: dropdown-in-data-v-4fbac4e1 .25s;
    opacity: 1;
    pointer-events: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
}
.dropdown{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.25),0 4px 4px rgba(var(--color-shadow-blue),.15);
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 50px;
    transition: opacity .2s ease;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 200px;
    right: -80px;
}
.dropdown:before {
    width: 0;
    height: 0;
    content: "";
    z-index: 2;
    transform: scale(1.01);
    border-bottom: .6rem solid currentColor;
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent;
    bottom: 100%;
    color: rgb(var(--color-gray-100));
    right: 92px;
    position: absolute;
}
.primary-links {
    padding: 21px 27px;
    margin-bottom: -18px;
}
.primary-link{
    align-items: center;
    color: rgb(var(--color-gray-700));
    display: grid;
    font-size: 1.4rem;
    font-weight: 600;
    grid-column-gap: 10px;
    grid-template-columns: 20px auto;
    letter-spacing: .03rem;
    margin-bottom: 18px;
    transition: color .2s ease;
}
.primary-link .icon {
    color: rgb(var(--color-gray-600));
    position: relative;
    font-size: 1.4rem;
    transition: color .2s ease;
}
.browse-wrap:hover:after, .user-wrap:hover:after {
    content: "";
    height: 20px;
    left: 0;
    position: absolute;
    width: 150%;
    top: 100%;
}
.user-wrap:hover:after {
    height: 30px;
    left: -150%;
    width: 300%;
    top: 60%;
}
.browse-wrap:hover .dropdown, .user-wrap:hover .dropdown {
    transition: .25s ease;
    opacity: 1;
    pointer-events: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
}
.footer {
    background: rgb(var(--color-background-200));
    border-radius: 0 0 6px 6px;
    color: rgb(var(--color-gray-700));
    display: grid;
    font-size: 1.1rem;
    font-weight: 600;
    grid-gap: 14px 12px;
    grid-template-columns: 72px auto;
    padding: 16px 27px;
}
.secondary-link{
    display: grid;
    grid-column-gap: 7px;
    grid-template-columns: 12px auto;
    transition: color .2s ease;
}
</style>
