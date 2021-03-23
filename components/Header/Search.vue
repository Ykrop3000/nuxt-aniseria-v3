<template>
  <div>
    <div class="search" @click="visible = !visible">
      <i class="fas fa-search" />
    </div>
    <div class="quick-search" :class="{'visible':visible}">
      <div class="input">
        <i class="icon fas fa-search" />
        <input type="text">
        <div @click="visible = !visible">
          <i class="icon right fa-times fas" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    triger () {
      if (this.visible === true) {
        this.visible = false
      }
    }
  }
}
</script>

<style scoped>
.search{
    margin-right: 15px;
    font-size: 1.4rem;
}
.search svg {
    color: #777a9e;
    cursor: pointer;
    transition: color .3s ease;
}
.quick-search.visible {
    opacity: 1;
    top: 0;
}
.quick-search{
    background: rgba(var(--color-overlay),.6);
    height: 100vh;
    left: 0;
    opacity: 0;
    overflow: auto;
    position: fixed;
    top: -100vh;
    transition: opacity .4s ease;
    width: 100vw;
    z-index: 3000;
}
.quick-search.visible .input{
    top: 80px;
}
.input {
    align-items: center;
    background: rgb(var(--color-foreground));
    border-radius: 6px;
    display: grid;
    grid-template-columns: 46px 1fr 46px;
    justify-items: center;
    left: calc(50% - 330px);
    position: absolute;
    top: 40px;
    transition: .25s ease;
    width: 660px;
    z-index: 1;
}
.input .icon {
    color: rgb(var(--color-text-light));
    font-size: 14px;
    transition: color .15s ease;
    z-index: 2;
}
.input input{
    background: 0 0;
    border: none;
    color: rgb(var(--color-text));
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -.01em;
    margin-left: 0;
    outline: 0;
    padding: 16px 0;
    padding-top: 18px;
    position: relative;
    text-transform: capitalize;
    width: 100%;
    z-index: 2;
}
.input .icon.right{
    cursor: pointer;
}
</style>
