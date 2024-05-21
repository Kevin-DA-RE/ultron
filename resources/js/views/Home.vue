<template>
  <div>
    <q-form
      @submit="sendMovies"
      class="q-gutter-md"
    >
      <q-uploader
      label="Téléchargez votre fichier"
      @added="sendApi"
      ></q-uploader>
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      </q-form>

      <div v-show="visible">
                <q-card class="my-card" style="width: 50vh;">
                  <div v-for="genre in jsonData.genre_name">
                    <q-badge outline color="primary" :label="genre" />
                  </div>
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
        visible: false,
      }
    },
    methods: {
      sendApi(files) {
                    const formData = new FormData();
                    files.forEach(file => {
                    formData.append('files', file.name);
                    });
                    var name= files[0].name.split('.mp4')[0];

                    this.getMovie(name);                   
              
                    // Config for send to movie to backend
                    this.getGenre();
                    this.visible = true;
            },        
        async getMovie(name)
        {
        /**
         * Recuperation data movie
         */
         var movie = await axios.get(`${this.apiTMDB.url_movies}`,{
                                          params: {
                                            query: name,
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
              this.urlImgComplete = `https://image.tmdb.org/t/p/original${urlImg}`;
              this.jsonData = {
                      "id": movie.id,
                      "name": movie.title,
                      "synopsis": movie.overview,
                      "url_img": this.urlImgComplete,
                      "genre_id": movie.genre_ids,
                      "genre_name":[]
                    }
          return this.jsonData;
        },
        async getGenre()
        {
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
          return category;
        },
        sendMovies()
        {
        /**
         * Envoi data pour créer un film
         */
          axios.post("http://127.0.0.1:8000/movie/get-information",this.jsonData,{
                                        headers:{
                                          accept: 'application/json',
                                          'Content-Type': 'application/json'
                                        }})
                                        .then(movie => (
                                          console.log(movie.data)
                                          ))
                                        .catch(e => (`Erreur lors de la récupération de données \n ${e}`))
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
  