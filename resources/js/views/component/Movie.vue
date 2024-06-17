<template>
  <q-card class="my-card" style="width: 50vh;">

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


    <q-btn label="Modifier" color="primary" @click="promptUpdate = true" />
      <q-dialog v-model="promptUpdate" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Saisir le nom du film</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="movieTitleChange" @change="changeMovie" autofocus />

              <q-img :src="movieUrlImg" id="qImg">
              <div class="absolute-top text-h6">
                  {{ movieTitle }}
                  </div>
              </q-img>
            <q-card-section>
                {{ movieSynopsis }}
            </q-card-section>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Annuler" v-close-popup @click="rest" />
              <q-btn flat label="Valider" v-close-popup @click="submit"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    
</template>
<script >

export default {
  name: "Movies",
  props: {
    movie: Object,
  },
  data() {
    return{
      promptUpdate: false,
      movieTitleChange: this.movie.name,
      movieTitle: this.movie.name,
      movieUrlImg: this.movie.url_img,
      movieSynopsis: this.movie.synopsis
    }

  },
  methods: {
   changeMovie() {
      this.$emit('change-movie', this.movieTitleChange)
    }
  }
}
</script>