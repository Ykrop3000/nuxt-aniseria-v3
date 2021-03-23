<template>
  <div class="sidebar">
    <div class="rankings" />
    <div class="data">
      <div v-if="anime.ongoing" class="data-set airing-countdown">
        <div class="type">
          Следующий эпизод
        </div>
        <div class="value">
          <span v-text="airing" />
        </div>
      </div>

      <div v-if="anime.genres" class="data-set data-list">
        <div class="type">
          Жанры
        </div>
        <div class="value">
          <span v-text="anime.genres.map(e => e.russian).join(', ')" />
        </div>
      </div>

      <div v-if="anime.aired_on" class="data-set">
        <div class="type">
          Дата выхода
        </div>
        <div class="value">
          <span v-text="aired_on" />
        </div>
      </div>

      <div v-if="anime.episodes" class="data-set">
        <div class="type">
          Эпизоды
        </div>
        <div class="value">
          <span v-text="anime.episodes" />
        </div>
      </div>

      <div v-if="anime.studios" class="data-set">
        <div class="type">
          Студии
        </div>
        <div class="value">
          <span v-text="anime.studios.map(e => e.name).join(', ')" />
        </div>
      </div>

      <div v-if="anime.kind" class="data-set">
        <div class="type">
          Формат
        </div>
        <div class="value">
          <span v-text="kind" />
        </div>
      </div>

      <div v-if="anime.status" class="data-set">
        <div class="type">
          Статус
        </div>
        <div class="value">
          <span v-text="status" />
        </div>
      </div>

      <div v-if="anime.english" class="data-set">
        <div class="type">
          Английский
        </div>
        <div class="value">
          <span v-text="anime.english.join(', ')" />
        </div>
      </div>

      <div v-if="anime.japanese" class="data-set">
        <div class="type">
          Японский
        </div>
        <div class="value">
          <span v-text="anime.japanese.join(', ')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sitebar',
  props: {
    anime: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      aired_on: this.$moment(this.anime.aired_on).format('LL'),
      airing: this.$moment(this.anime.next_episode_at).endOf('day').fromNow(),
      kind: this.$store.state.kind[this.anime.kind],
      status: this.$store.state.statusAnime[this.anime.status]
    }
  }
}
</script>

<style scoped>

.data {
    background: rgb(var(--color-foreground));
    border-radius: 3px;
    padding: 18px;
}
.tags{
    margin-top: 20px;
}
.data-set {
    padding-bottom: 14px;
}
.data-list .type{
    padding-bottom: 2px;
}
.type{
    font-size: 1.3rem;
    font-weight: 500;
    padding-bottom: 5px;
}
.value {
    color: rgb(var(--color-text-lighter));
    font-size: 1.2rem;
    line-height: 1.3;
}
.data-list .value{
    line-height: 1.4;
}
.airing-countdown {
    color: rgb(var(--color-blue));
}
.airing-countdown .value{
    color: rgb(var(--color-blue));
    font-weight: 500;
}
@media (max-width: 760px){
    .data {
        display: flex;
        margin-bottom: 25px;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
    }
    .data-set{
        padding-bottom: 0;
        padding-right: 25px;
    }
    .type{
        color: rgb(var(--color-text-lighter));
        font-size: 1.3rem;
        font-weight: 400;
        padding-bottom: 6px;
    }
    .data-list .type{
        padding-bottom: 6px;
    }
    .value{
        color: rgb(var(--color-text));
        font-size: 1.4rem;
    }
}
</style>
