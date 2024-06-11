<template>
  <q-card class="my-card" style="width: 50vh;">
    <!--Prompt pour modification-->
    <q-btn label="Modifier" color="primary" @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Saisir le nom du film</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="movie.name" @change="" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import { ref } from 'vue';
export default {
  name: "Movie",
  props: {
    movie: Object
  },
  setup () {
    return {
      prompt: ref(false),
    }
  }
}
</script>