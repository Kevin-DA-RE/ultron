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
    <div v-for="movie in movies">
        <q-card class="my-card" style="width: 50vh;">
        <q-img :src="movie.urlimg" id="qImg">
            <div class="absolute-top text-h6">
            {{ movie.name }}
            </div>
        </q-img>
        <q-card-section>
            {{ movie.synopsis }}
        </q-card-section>
        </q-card>
    </div>
    <q-card class="my-card" style="width: 50vh;">
        <q-img :src="this.jsonData.url_img" id="qImg">
            <div class="absolute-top text-h6">
            {{ this.jsonData.name }}
            </div>
        </q-img>
        <q-card-section>
            {{ this.jsonData.synopsis }}
        </q-card-section>
        </q-card>

  </div>
</template>
<script>
import axios from 'axios';
import {Notify} from 'quasar'

export default {
  data() {
    return {
      name: '',
      url : 'https://api.themoviedb.org/3/search/movie',
      urlImgComplete: '',
      jsonData: {
        name: '',
        synopsis: '',
        url_img: ''
      },
      movies:[],
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

        var urlImg = response.poster_path;
        this.urlImgComplete = `https://image.tmdb.org/t/p/w500${urlImg}`;

      // Config for send to movie to backend
      this.jsonData = {
        "name": response.title,
        "synopsis": response.overview,
        "url_img": this.urlImgComplete
      }

      await axios.post("http://127.0.0.1:8000/movie/create-movie",this.jsonData,{
                                      headers:{
                                        accept: 'application/json',
                                        'Content-Type': 'application/json'
                                      }})
                                      .then(response => (
                                        console.log(response.data),
                                        Notify.create({
                                            message: response.data.message,
                                            position: 'top', // Positionnez la notification en haut
                                            timeout: 2500
                                            })
                                        ))
                                      .catch(e => (`Erreur lors de la récupération de données \n ${e}`))
      },
        reset(){
        this.name = "";
        }
    },
    mounted(){
            axios.get("http://127.0.0.1:8000/movie/get-movie")
            .then(r => {
              this.movies = r.data;
              /*
                r.data.forEach(element => {
                this.jsonData = {
                        "name": element.name,
                        "synopsis": element.synopsis,
                        "url_img": element.url_img
                    }
                });*/
            })
            .catch( e => {
                console.log(`erreur lors de la recuperation des données : \n ${e}`);
            })
        }
    }
</script>
<style>
#qImg {
width: '600px'
}
</style>
