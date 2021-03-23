<template>
  <span class="spinner">
    <div class="emoji-spinner" v-text="emoji[rand]" />
  </span>
</template>

<script>
function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export default {
  data () {
    return {
      emoji: [
        '〜(￣▽￣〜)',
        '༼ つ ◕_◕ ༽つ',
        '(~˘▾˘)~',
        '\\ (•◡•) /',
        '(─‿‿─)',
        '(≧◡≦)'
      ],
      rand: getRandomInt(6)
    }
  }
}
</script>

<style scoped>
.spinner{
    width: 100%;
    display: flex;
}
.circle, .emoji-spinner {
    justify-content: center;
    text-align: center;
    width: 100%;
}
@-moz-keyframes spin {
    100% { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
    100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
    100% { -webkit-transform: rotate(360deg); transform:rotate(360deg);}
}
.emoji-spinner {
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-name: spin;
    animation-timing-function: linear;
    display: flex;
    flex-direction: column;
    font-size: 1.8rem;
    margin: 50px 0;
}

</style>
