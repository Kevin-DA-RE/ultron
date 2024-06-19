<template>
  <q-card class="my-card" style="width: 50vh;">

    <!--Card pour afficher les éléments-->
    <q-card class="my-card" style="width: 50vh">
        <q-btn label="Modifier" color="primary" @click="promptUpdate = true" />
        <div v-for="genre in movie.genre_name" :key="genre.id">
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


      <q-dialog v-model="promptUpdate" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Saisir le nom du film</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input dense v-model="movieTitleChange" @change="changeMovie" autofocus />
                <div v-if="movieUpdated">
                    <q-img :src="movieUpdated.url_img" id="qImg">
                        <div class="absolute-top text-h6">
                            {{ movieUpdated.name }}
                            </div>
                        </q-img>
                        <q-card-section>
                            {{ movieUpdated.synopsis }}
                    </q-card-section>

                </div>
                <div v-else>
                    <q-img :src="movieUrlImg" id="qImg">
                        <div class="absolute-top text-h6">
                            {{ movieTitle }}
                            </div>
                        </q-img>
                        <q-card-section>
                            {{ movieSynopsis }}
                    </q-card-section>
                </div>

            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Annuler" v-close-popup @click="rest" />
              <q-btn flat label="Valider" v-close-popup @click="submit"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </q-card>
</template>
<script >

export default {
  name: "ListMovies",
 props: {
    movie: {
      type: Object,
      required: true,
    },
    movieUpdated: {
        type: Object,
        required: false,
    }
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
    console.log(`dans enfant ${this.movieTitleChange}`);
      this.$emit('change-movie', this.movieTitleChange)
    }
  }
}
</script>
