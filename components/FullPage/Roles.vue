<template>
  <div>
    <h2 v-text="title" />
    <div class="grid-wrap">
      <div v-for="(i,id) in roles" :key="id" class="role-card view-character-staff">
        <div class="character">
          <NuxtLink :lazy-background="shikiUrl + i.character.image.preview" :to="'/charapter/'+i.character.id" class="cover" />
          <NuxtLink :to="'/charapter/'+i.character.id" class="content">
            <div class="name" v-text="i.character.russian" />
            <div class="role" v-text="i.roles.join(',')" />
          </NuxtLink>
        </div>
        <div class="staff" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Roles',
   props: {
    roles:{
      type: Array,
      default(){
        return []
      }
    },
    title:{
      type: String,
      default(){
        return ''
      }
    }
  },
  computed: {
    shikiUrl () { return this.$store.getters.getShikiUrl }
  }

}
</script>

<style scoped>
.grid-wrap {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 15px;

    grid-template-columns: repeat(3,1fr);
}
.view-character-staff {
    grid-template-areas: "character staff";
}
.role-card {
    background: rgb(var(--color-foreground));
    border-radius: 3px;
    display: inline-grid;
    grid-template-columns: 50% 50%;
    height: 80px;
    overflow: hidden;
}
.role-card>div{
    display: inline-grid;
    grid-template-columns: 60px auto;
    grid-template-areas: "image content";
}
.character {
    grid-area: character;
}
.cover{
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    grid-area: image;
}
.content{
    font-size: 1.2rem;
    grid-area: content;
    overflow: hidden;
    padding: 10px;
}
.content .name {
    display: block;
    height: 48px;
    line-height: 1.3;
}
.content .role{
    color: rgb(var(--color-text-lighter));
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
@media (max-width: 1540px){
    .grid-wrap {
        grid-template-columns: repeat(2,1fr);
    }
}
@media (max-width: 1040px){
    .grid-wrap {
        grid-template-columns: repeat(1,1fr);
    }
}
</style>
