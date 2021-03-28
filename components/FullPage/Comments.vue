<template>
  <div
    v-infinite-scroll="handleScroll"
    class="comments container"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <h2>Комментарии</h2>
    <SpinnerItem v-if="render && comments.length == 0" />

    <div class="comment-editor" :class="{'active': open}">
      <div class="wrap">
        <div class="editor">
          <!-- <el-input
            v-model="text_comment"
            type="textarea"
            :rows="5"
            placeholder="Write comment"
          /> -->

          <div class="actions">
            <div class="button cancel" @click="open = false">
              Закрыть
            </div>
            <div class="button save" @click="submit">
              Написать
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoggedIn" class="comment-create">
      <div class="actions">
        <div class="button comment" @click="open = !open">
          Написать
        </div>
      </div>
    </div>

    <div v-for="(i,_id) in comments" :key="_id" ref="comments" class="comment-wrap depth-0">
      <div class="comment">
        <div class="header">
          <router-link :to="{name: 'User', params:{username:i.user.nickname}}" class="user">
            <div :lazy-background="i.user.avatar" class="avatar" />
            {{ i.user.nickname }}
          </router-link>
          <div class="time" v-text="date(i.created_at)" />
        </div>
        <div class="markdown" v-html="i.html_body" />
      </div>
    </div>
  </div>
</template>

<script>

const SpinnerItem = () => import('../SpinnerItem')

export default {
  components: {
    SpinnerItem
  },
  props: {
    id: {
      type: Number,
      default () {
        return 0
      }
    },
    render: {
      type: Boolean,
      default () {
        return false
      }
    },
    isLoggedIn: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      text_comment: '',
      open: false,
      loading: false
    }
  },
  computed: {
    comments () { return this.$store.getters['anime/getComments'] }
  },
  watch: {
    comments () {
      this.loading = false
      this.smiley()
    }
  },
  mounted () {
    this.loading = true
    this.$store.dispatch('anime/fetchComments', { id: this.id, page: 1 })
  },
  methods: {
    handleScroll () {
      if (this.render && this.id && this.comments.length !== 0 && !this.loading) {
        this.loading = true
        const page = Math.ceil(this.comments.length / 11) + 1
        this.$store.dispatch('anime/fetchComments', { id: this.id, page })
      }
    },
    submit () {
      // this.SET_COMMENTS({ id: this.id, text: this.text_comment })
      this.open = false
    },
    date (d) {
      return this.$moment(d).startOf('day').fromNow()
    },
    smiley () {
      const comments = this.$refs.comments
      if (!comments) { return }

      comments.forEach((comment) => {
        const smile = comment.getElementsByClassName('smiley')
        smile.forEach((img) => {
          const s = img.src.split('/')
          img.src = `https://shikimori.one/images/smileys/${s[s.length - 1]}`
        })
      })
    }
  }

}
</script>

<style scoped>
.comments{
    margin-top: 40px;
}
.comment-wrap {
    background: rgb(var(--color-foreground));
    margin-bottom: 20px;
    border-radius: 4px;
    font-size: 1.4rem;
}
.comment-wrap.depth-0 {
    padding-bottom: 2px;
    margin-bottom: 25px;
}
.comment {
    padding: 20px;
}
.header{
    align-items: center;
    display: flex;
    margin-bottom: 15px;
}
.comment .markdown{
    line-height: 1.4;
}
.markdown {
    overflow-wrap: break-word;
    word-break: break-word;
}
.header .time{
    color: rgb(var(--color-text-lighter));
    margin-left: 12px;
    font-size: 1.2rem;
}
.user {
    align-items: center;
    color: rgb(var(--color-blue));
    display: flex;
}
.avatar{
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px;
    display: inline-block;
    height: 35px;
    margin-right: 12px;
    width: 35px;
}
.comment-editor {
    bottom: -300px;
    left: 0;
    opacity: 0;
    padding: 10vh 10vw;
    pointer-events: none;
    position: fixed;
    transition: bottom .3s ease,opacity .2s ease;
    width: 100vw;
    z-index: 999;
}
.comment-editor.active{
    bottom: 0;
    opacity: 1;
    pointer-events: auto;
}
.wrap {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr;
}
.wrap .editor{
    padding-top: 10px;
}

.wrap .editor, .wrap .preview{
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 30px 0 rgba(var(--color-shadow-dark),.18);
}
.actions{
    margin-top: 10px;
    justify-content: flex-end;
    display: flex;
}
.comment-create{
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 35px;
}
.comment-create .actions{
    align-items: center;
    display: flex;
    margin-left: auto;
    margin-top: 0px;
}
.button.comment{
    background: rgb(var(--color-blue));
    padding-left: 15px;
    padding-right: 30px;
}

.button {
    align-items: center;
    background: rgb(var(--color-blue));
    border-radius: 4px;
    color: rgb(var(--color-text-bright));
    cursor: pointer;
    display: inline-flex;
    font-size: 1.3rem;
    margin-left: 18px;
    padding: 10px 15px;
    transition: .2s;
}
.comment-create .button {
    align-items: center;
    border-radius: 4px;
    color: rgb(var(--color-text-bright));
    cursor: pointer;
    display: inline-flex;
    font-size: 1.4rem;
    height: 36px;
    margin-left: 18px;
    padding: 10px 20px;
}
.button.cancel {
    background: rgb(var(--color-background));
    color: rgb(var(--color-text-light));
}

@media (max-width: 1040px){
    .comment-editor {
        padding: 20px;
    }
    .wrap{
        display: block;
    }
}
</style>
