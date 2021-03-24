<template>
  <div class="airing-view">
    <SpinnerItem v-if="days.length === 0 " />
    <div v-else class="calendar">
      <div v-for="(j,id) in days.slice(1)" :key="id" class="day">
        <h2 v-text="j.title" />
        <div class="cards">
          <div v-for="i in j.animes" :key="i.anime.id" class="airing-card">
            <NuxtLink :to="i.anime.url">
              <img v-lazy-load :data-src="shikiUrl+i.anime.image.preview" alt="poster" class="image">
              <div class="content">
                <div class="title" v-text="i.anime.russian" />
                <div class="airing" v-text="`${i.next_episode} серия выйдет ${$moment(i.next_episode_at).calendar()}`" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SpinnerItem = () => import('@/components/SpinnerItem')

export default {
  name: 'Calendar',
  metaInfo: {
    title: 'Календарь онгоингов - AniSeria'
  },
  components: {
    SpinnerItem
  },
  computed: {
    shikiUrl () { return this.$store.getters.getShikiUrl },
    CALENDAR () { return this.$store.getters['calendar/getCalendar'] },
    days: {
      get () {
        if (this.CALENDAR.length !== 0) {
          const data = []
          this.CALENDAR.forEach((day) => {
            const d = this.$moment(day.next_episode_at).calendar().split(',')[0]
            if (data.filter(t => t.title === d).length === 0) {
              data.push({
                title: d,
                animes: this.CALENDAR.filter(e => this.$moment(e.next_episode_at).calendar().split(',')[0] === d)
              })
            }
          })
          return data
        } else {
          return []
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('calendar/fetchCalendar')
  }
}
</script>

<style scoped>
h2{
    font-size: 2rem;
    margin: 18px 0 ;
}
.airing-card{
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    box-shadow: 0 4px 6px rgb(49 54 68 / 5%), 0 5px 20px rgb(49 54 68 / 8%);
    max-height: 65px;
    margin-bottom: 24px;
    position: relative;
    transition: box-shadow .6s ease,color .2s ease,transform .2s ease-in-out;
}
.airing-card a {
    display: grid;
    grid-template-columns: 50px auto;
}
.image {

    border-radius: 4px 0 0 4px;
    height: 100%;
    max-height: 65px;
    object-fit: cover;
    object-position: center;
    opacity: 1;
    transition: opacity .3s;
    width: 100%;
    position: relative;
}
.image.loaded {
    opacity: 1;
}
.content {
    padding: 10px 14px;
    position: relative;
    min-width: 0;
}
.title{
    font-size: 1.4rem;
    font-weight: 800;
    overflow: hidden;
    padding-bottom: 3px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.airing{
    font-size: 1.3rem;
    font-weight: 600;
    opacity: .9;
}

@media (min-width: 800px){
    .calendar{
        margin: 0 auto;
        max-width: 2000px;
        width: 80vw;
    }

    .cards {
        display: grid;
        grid-column-gap: 24px;
        grid-row-gap: 6px;
        grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
        justify-content: center;
        min-width: 0;
    }
}
@media (max-width: 800px){
    .calendar{
        cursor: grab;
        display: grid;
        justify-content: left;
        max-width: 100vw;
        min-height: 100vh;
        overflow-x: scroll;
        transition: transform .2s ease-in-out;
        padding-left: 5vw;
        grid-column-gap: 20px;
        -ms-scroll-snap-type: x proximity;
        scroll-snap-type: x proximity;
        grid-template-columns: repeat(9,80vw);
    }
    .day{
        margin-bottom: 100px;
        min-width: 0;
        scroll-snap-align: center;
    }
    .day h2{
        color: rgb(var(--color-text));
        font-size: 1.5rem;
        font-weight: 900;
        letter-spacing: .1rem;
        text-align: left;
        text-transform: uppercase;
    }

}

</style>
