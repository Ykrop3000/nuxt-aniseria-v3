<template>
  <div class="filters-wrap primary-filters">
    <div v-if="$vssWidth < 1040" class="mobile-filters">
      <div class="search-wrap">
        <i class="icon fas fa-search icon" />
        <input v-model="search" type="search" placeholder="Поиск" class="search">
      </div>
      <div class="open-btn" :class="{'active': mobileFilters}" @click="mobileFilters = !mobileFilters">
        <i class="icon fas fa-sliders-h" />
      </div>
    </div>
    <transition name="filters-animation" mode="out-in">
      <div v-if="mobileFilters || $vssWidth >= 1040" class="filters">
        <div v-if="$vssWidth >= 1040" class="filter filter-select">
          <div class="name">
            Поиск
          </div>
          <div class="search-wrap">
            <i class="fas fa-search" />
            <input v-model="search" type="text" class="search">
          </div>
        </div>
        <SelectItem :placeholder="'Любые'" :title="'Жанры'" :type="'genre'" :_options="genres" />
        <SelectItem :placeholder="'Любой'" :title="'Год'" :single="true" :type="'season'" :_options="years" />
        <SelectItem :placeholder="'Любой'" :title="'Тип'" :single="true" :type="'kind'" :_options="kind" />
        <SelectItem :placeholder="'Любой'" :title="'Статус'" :single="true" :type="'status'" :_options="status" />
      </div>
    </transition>
  </div>
</template>

<script>
import SelectItem from './SelectItem'

export default {
  components: {
    SelectItem
  },
  props: [
  ],
  data () {
    return {
      filter: {},
      search: this.$route.query.search || '',
      mobileFilters: false,
      status: [
        {
          id: 'anons',
          name: 'anons',
          russian: 'Анонсировано'
        },
        {
          id: 'ongoing',
          name: 'ongoing',
          russian: 'Сейчас выходит'
        },
        {
          id: 'released',
          name: 'released',
          russian: 'Вышедшее'
        }
      ],
      kind: [
        {
          id: 'tv',
          name: 'tv',
          russian: 'TV Сериал'
        },
        {
          id: 'movie',
          name: 'movie',
          russian: 'Фильм'
        },
        {
          id: 'ova',
          name: 'ova',
          russian: 'OVA'
        },
        {
          id: 'ona',
          name: 'ona',
          russian: 'ONA'
        },
        {
          id: 'special',
          name: 'special',
          russian: 'Спешл'
        },
        {
          id: 'music',
          name: 'music',
          russian: 'Клип'
        }
      ]
    }
  },
  computed: {
    years: () => {
      const d = []
      for (let i = 1970; i <= 2022; i += 1) {
        d.push({
          id: i,
          name: i
        })
      }
      d.reverse()
      return d
    },
    genres () {
      return this.$store.getters.getGenres
    }
  },
  watch: {
    search (val) {
      const query = Object.assign({}, this.$route.query, { search: val })
      this.$router.push({ query })
    }
  },
  mounted () {
    this.FilterOptions = this.options
    document.querySelector('#app').classList.add('filters-loaded')
  },
  methods: {

  }
}
</script>

<style scoped>

.filters-animation-enter-active {
    animation: open .2s ease;

}
.filters-animation-leave-active {
    animation: open .2s ease reverse;

}
@keyframes open{
  from {
    filter: opacity(0);
  }
  to {
    filter: opacity(1);
  }
}

.select-wrap{
    position: relative;
    width: 100%;
}
.select{
    align-items: center;
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.04);
    cursor: pointer;
    display: grid;
    font-size: 1.3rem;
    font-weight: 600;
    grid-template-columns: auto 20px;
    letter-spacing: .03rem;
    padding: 11px 16px;
}
.options{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    left: 0;
    position: absolute;
    top: calc(100% + 10px);
    width: 100%;
    z-index: 50;
}
.option-group:first-of-type .group-title{
    margin-top: 0;
}
.option.selected, .option:hover {
    color: rgb(var(--color-blue-600));
    background: rgba(var(--color-background-200),.6);
}
.option{
    border-radius: 4px;
    color: rgb(var(--color-gray-700));
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 10px 12px;
    transition: background .2s ease-in-out,color .2s ease-in-out;
    white-space: normal;
}
.label{
    display: grid;
    grid-template-columns: auto 16px;
}
.group-title{
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: .06rem;
    margin-top: 15px;
    padding: 4px;
    text-transform: uppercase;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.scroll-wrap{
    max-height: 500px;
    overflow: auto;
    overscroll-behavior: contain;
    padding: 10px;
}
.ps-container {
    position: relative;
}
.ps {
    overflow: hidden!important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
}
.filter{
    background: 0 0;
    border: none;
    color: rgb(var(--color-gray-700));
    display: inline-block;
    margin: 0;
    outline: 0;
    padding: 0;
    width: 100%;
}
.placeholder {
    color: rgb(var(--color-gray-500));
}
.placeholder, .tags, .value{
    position: absolute;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.value-wrap{
    position: relative;
    max-height: 14px;
}
.primary-filters{
    z-index: 700;
}
.filters-wrap {
    display: grid;
    grid-template-columns: auto 42px;
    align-items: center;
}
.name{
    color: rgb(var(--color-gray-900));
    font-size: 1.5rem;
    font-weight: 600;
    padding: 10px 0;
    text-transform: capitalize;
}

.search-wrap svg{
    color: rgb(var(--color-gray-400));
    font-size: 1.3rem;
    height: 1.6rem;
}
.filters{
    margin: 40px 0;
    margin-bottom: 25px;
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(5,1fr);
}
.mobile-filters{
    align-items: center;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: auto 42px;
    margin-top: 20px;
    padding: 0 20px;
    margin-bottom: 20px;
}
.mobile-filters .search-wrap{
    align-items: center;
    grid-gap: 12px;
}
.search-wrap{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.04);
    display: grid;
    font-size: 1.3rem;
    font-weight: 600;
    grid-gap: 10px;
    grid-template-columns: 13px auto 13px;
    letter-spacing: .03rem;
    padding: 11px 16px;
    padding-left: 13px;
}
.mobile-filters .search-wrap .search{
    padding-top: 3px;
}
.search::placeholder{
    color: rgb(var(--color-gray-500));
}
.search {
    background: 0 0;
    border: none;
    color: rgb(var(--color-gray-500));
    display: inline-block;
    font-weight: 600;
    margin: 0;
    outline: 0;
    padding: 0;
    width: 100%;
}
.open-btn{
    align-items: center;
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.04);
    color: rgb(var(--color-gray-500));
    cursor: pointer;
    display: inline-flex;
    font-size: 1.8rem;
    height: 42px;
    justify-content: center;
    width: 42px;
    transition: color .3s ease-in-out;
}
.open-btn.active{
    color: rgb(var(--color-blue-500));
}
.mobile-filters+.filters {
    margin-top: -5px;
}

@media (min-width: 1540px){
    .filters {
        grid-template-columns: repeat(6,1fr);
    }
}
@media (max-width: 1040px){
    .filters-wrap{
        grid-template-columns: auto;
    }
    .filters{
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        margin: 20px 0;
        margin-bottom: -560px;
        padding-bottom: 600px;
        grid-template-columns: repeat(30,auto);
        -ms-scroll-snap-type: x mandatory;
        scroll-snap-type: x mandatory;
        grid-gap: 0;
        -webkit-overflow-scrolling: initial;
    }
    .filters .filter-select{
        width: 190px;
    }
    .filters .filter{
        scroll-snap-align: start;
        padding-left: 20px;
    }
}
</style>
