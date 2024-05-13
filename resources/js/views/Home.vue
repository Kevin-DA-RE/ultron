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
      <div v-show="visible">
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
      </div>
      
    </div>
  </template>
  <script>
  import axios from 'axios';
  import {Notify} from 'quasar'
  
  export default {
    data() {
      return {
        name: '',
        apiTMDB: {
          "token": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTFlMjdhNzVhZTY1ZTNjNDUxNjdlMmVkOTYwMmU3MSIsInN1YiI6IjY1ZThlZmEzM2Q3NDU0MDE3ZGI4MzczNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GNY6Ryp_gInMIzeoedzI7ooJHMdm1wX9YSTQyODot9s",
          "url_movies" : 'https://api.themoviedb.org/3/search/movie',
          "url_genres" : 'https://api.themoviedb.org/3/genre/movie/list?language=fr',
        },      
        urlImgComplete: '',
        jsonData: {},
        movies:[],
        visible: false,
      }
    },
    methods: {
      async sendApi() {
        /**
         * Recuperation data movie
         */
          var movie = await axios.get(`${this.apiTMDB.url_movies}`,{
                                          params: {
                                            query: this.name,
                                            include_adult: false,
                                            language: 'fr-FR',
                                            page: 1
                                          },
                                        headers:{
                                          Authorization: `Bearer ${this.apiTMDB.token}`,
                                          accept: 'application/json',
                                          'Content-Type': 'application/json'
  
                                        }})
                                        .then(movie => movie.data.results[0])
                                        .catch(error => console.log(`Erreur lors de la récupération de datas sur le film \n ${error}`));
  
          var urlImg = movie.poster_path;
          this.urlImgComplete = `https://image.tmdb.org/t/p/w500${urlImg}`;
  
        // Config for send to movie to backend
        this.jsonData = {
          "id": movie.id,
          "name": movie.title,
          "synopsis": movie.overview,
          "url_img": this.urlImgComplete,
          "genre_id": movie.genre_ids,
          "genre_name":[]
        }
  
         /**
         * Recuperation data category
         */
  
         var category = await axios.get(`${this.apiTMDB.url_genres}`,{
                                          params: {
                                            query: ""
                                          },
                                        headers:{
                                          Authorization: `Bearer ${this.apiTMDB.token}`,
                                          accept: 'application/json',
                                          'Content-Type': 'application/json'
  
                                        }})
                                        .then(category => category.data.genres)
                                        .catch(error => console.log(`Erreur lors de la récupération de datas sur le film \n ${error}`));
          // Insert category in jsonData
          this.jsonData.genre_id.forEach(id => {
            category.forEach(ids => {
                    if (id === ids.id) {
                      this.jsonData.genre_name.push(ids.name);
                    }
                });
            });
  
          
          /**
         * Envoi data pour créer un film
         */
        /*
         await axios.post("http://127.0.0.1:8000/movie/get-information",this.jsonData,{
                                        headers:{
                                          accept: 'application/json',
                                          'Content-Type': 'application/json'
                                        }})
                                        .then(movie => (
                                          console.log(movie.data)
                                          ))
                                        .catch(e => (`Erreur lors de la récupération de données \n ${e}`))
  */
        
        /**
         * Envoi data pour créer un film
         */
        /*
        await axios.post("http://127.0.0.1:8000/movie/create-movie",this.jsonData,{
                                        headers:{
                                          accept: 'application/json',
                                          'Content-Type': 'application/json'
                                        }})
                                        .then(movie => (
                                          console.log(movie.data),
                                          Notify.create({
                                              message: movie.data.message,
                                              position: 'top', // Positionnez la notification en haut
                                              timeout: 2500
                                              })
                                          ))
                                        .catch(e => (`Erreur lors de la récupération de données \n ${e}`))
                                        */
        },
          reset(){
          this.name = "";
          }
      },
      mounted(){
        
        /*
              axios.get("http://127.0.0.1:8000/movie/get-movie")
              .then(r => {
                console.log(r.data);
                if (lengtResponse > 0)
                {
                  this.visible = true;
                  this.movies = r.data;
                } else {
                  this.visible = false;
                  this.movies = [];
                }
              })
              .catch( e => {
                  console.log(`erreur lors de la recuperation des données : \n ${e}`);
              })
              */
          }
      }
  </script>
  <style>
  #qImg {
  width: '600px'
  }
  </style>
  