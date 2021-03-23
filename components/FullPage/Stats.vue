<template>
  <div class="stats">
    <div class="status-distribution">
      <h2>В списках у людей</h2>
      <div class="status-distribution content-wrap">
        <div class="statuses">
          <div v-for="(i, id) in statuses" :key="id" class="status">
            <div class="name" :style="{'background': colors[id]}" v-text="i.name" />
            <div class="amount" :style="{'color': colors[id]}">
              {{ i.value || i.size }}
            </div>
          </div>
        </div>
        <div class="percentage-bar">
          <div v-for="(i, id) in statuses" :key="id" class="percentage" :style="{'background': colors[id], 'width': `${(i.value || i.size)/onePer}%`}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statuses: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      colors: [
        'rgb(104, 214, 57)',
        'rgb(2, 169, 255)',
        'rgb(146, 86, 243)',
        'rgb(247, 121, 164)',
        'rgb(232, 93, 117)'
      ]
    }
  },
  computed: {
    onePer: {
      get () {
        if (this.statuses) {
          let s = 0
          this.statuses.forEach((element) => {
            s += element.value || element.size
          })
          return s / 100
        } else {
          return 0
        }
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.content-wrap {
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    font-size: 1.4rem;
    padding: 20px;
}
.status-distribution{
    padding: 0!important;
    overflow: hidden;
}
.grid-section-wrap{
    display: grid;
    grid-auto-rows: -webkit-min-content;
    grid-auto-rows: min-content;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    grid-template-areas: "status .";
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
}
.status-distribution {
    padding: 0!important;
    overflow: hidden;
}
.statuses{
    display: grid;
    grid-auto-flow: column;
    justify-content: space-around;
    padding: 20px;
}
.status{
    text-align: center;
}
.percentage{
    display: inline-block;
    height: 11px;
}
.name {
    background: #673ab7;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 8px;
    padding: 6px 15px;
}
.label {
    color: rgba(var(--color-text-light),.6);
    font-size: 1.2rem;
}
.percentage-bar{
    display: flex;
    flex-grow: 1;
    line-height: 0;
}
@media (max-width: 1540px){
    .statuses{
        padding: 20px 10px;
    }
    .statuses .status:last-child {
        display: none;
    }
}
@media (max-width: 1040px){
    .grid-section-wrap{
        grid-column-gap: 0;
        grid-template-areas: "status";
        grid-template-columns: 1fr;
    }
}
@media (max-width: 500px) {
    .name{
        padding: 6px !important;
    }
}
</style>
