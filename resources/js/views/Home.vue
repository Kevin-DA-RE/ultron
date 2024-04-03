<template>
  <div>
    <q-form
      @submit="sendApi"
      @reset="reset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Entrez le nom du film"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>


    <q-card class="my-card" style="width: 50vh;">
      <q-img :src="urlImgComplete" id="qImg">
        <div class="absolute-top text-h6">
          {{ title }}
        </div>
      </q-img>

      <q-card-section>
        {{ synopsis }}
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      title: '',
      synopsis: '',
      url : 'https://api.themoviedb.org/3/search/movie',
      urlImgComplete: '',
      jsonData: {
        name: '',
        synopsis: '',
        url_img: ''
      }
    }
  },
  methods: {
    async sendApi() {
        const response = await axios.get(`${this.url}`,{
                                        params: {
                                          query: this.name,
                                          include_adult: false,
                                          language: 'fr-FR',
                                          page: 1
                                        },
                                      headers:{
                                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTFlMjdhNzVhZTY1ZTNjNDUxNjdlMmVkOTYwMmU3MSIsInN1YiI6IjY1ZThlZmEzM2Q3NDU0MDE3ZGI4MzczNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GNY6Ryp_gInMIzeoedzI7ooJHMdm1wX9YSTQyODot9s',
                                        accept: 'application/json',
                                        'Content-Type': 'application/json'

                                      }})
                                      .then(response => (response.data.results[0]));
        this.title = response.title;
        this.synopsis = response.overview;
        var urlImg = response.poster_path;
        this.urlImgComplete = `https://image.tmdb.org/t/p/w500${urlImg}`;

      // Config for send to movie to backent
      this.jsonData = {
        'name': this.title,
        "synopsis": this.synopsis,
        "url_img": this.urlImgComplete
      }

      const setMovie = await axios.post("http://127.0.0.1:8000/movie/setMovie",this.jsonData,{
                                      headers:{
                                        accept: 'application/json',
                                        'Content-Type': 'application/json'
                                      }})
                                      .then(response => (response.data.message))
                                      .catch(e => (`Erreur lors de la récupération de données \n ${e}`))
      },
    reset(){
      this.name = "";
    }
  }
}
</script>
<style>
#qImg {
width: '600px'
}
</style>
