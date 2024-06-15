<template>
  <q-card class="my-card" style="width: 50vh;">

    <!--Prompt pour modification-->
    <EditMovie :movie="movie"/>
    <!--Card pour afficher les éléments-->

      <div v-for="genre in movie.genre_name">
        <q-badge outline color="primary" :label="genre.name" />
      </div>
      <q-img :src="movie.url_img" id="qImg">
          <div class="absolute-top text-h6">
          {{ movie.name }}
          </div>
      </q-img>
      <q-card-section>
          {{ movie.synopsis }}
      </q-card-section>
    </q-card>
    
</template>
<script >

import EditMovie from './EditMovie.vue';

export default {
  name: "Movies",
  props: {
    movie: Object
  },
  components: {
    EditMovie
    }
}
</script>