<template>
  <div>
    <q-form
      @submit="sendMovies"
      class="q-gutter-md"
    >
      <q-uploader
      multiple
      label="Téléchargez votre fichier"
      @added="sendApi"
      ></q-uploader>
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      </q-form>

      <div v-show="visible">
          <div v-for="movie in movies">
            <q-card class="my-card" style="width: 50vh;">
                  <div v-for="genre in movie.genre_name">
                    <q-badge outline color="primary" :label="genre" />
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
        movies: [],
        visible: false,
      }
    },
    methods: {
      async sendApi(files) {
        if (this.visible == false) {
          this.visible = true;
        }
      const extension = [
        ".mp4",
        ".mkv",
        ".avi",
        ".mpeg",
        ".mpg"
      ];

      files.forEach(file => {
        extension.forEach(ext => {
          if (file.name.includes(ext)) {
             var name = file.name.split(ext)[0];
              this.getMovieWithGenre(name);
          }         
        })  
      });
       
      },

      // Recherche du film et de son/ses genre(s)
      async getMovieWithGenre(name){
        const movieData = await this.getMovie(name);
        if (!movieData) {
          return `Le film n'a pas été trouvé`;
        }
        
        const genreData = await this.getGenre(movieData.genre_id);
        if (!genreData) {
          return `Le genre n'a pas été trouvé`;
        }

        return {
          "movie": movieData,
          "genre": genreData
        }
      },

      //Recherche du film
      async getMovie(name){
        /**
         * Recuperation data movie
         */
         var moviesList = await axios.get(`${this.apiTMDB.url_movies}`,{
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
                                        .then(movie => movie.data.results)
                                        .catch(error => console.log(`Erreur lors de la récupération de datas sur le film \n ${error}`));

              // Nous checkons la taille de movies pour ensuite retourner le ou les films trouvés
              const movieLength = moviesList.length;
              var movies = movieLength > 0 ?  moviesList:moviesList[0];
              var urlImg = movies.poster_path;
              this.urlImgComplete = `https://image.tmdb.org/t/p/original${urlImg}`;

              if (movieLength> 0) {
                
                console.log("nous retournons tous les films trouvés");
                movies.forEach(movie => {
                  console.log(movie);
                   return  {
                        "id": movie.id,
                        "name": movie.title,
                        "synopsis": movie.overview,
                        "url_img": this.urlImgComplete,
                        "genre_id": movie.genre_ids
                      }
                });
              } else {
                console.log("nous retournons le film trouvé");
                console.log(moviesList);
                return  {
                        "id": moviesList.id,
                        "name": moviesList.title,
                        "synopsis": moviesList.overview,
                        "url_img": this.urlImgComplete,
                        "genre_id": moviesList.genre_ids
                      }
              }
             
        },
        
        async getGenre(arrayId) {
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
            // Nous comparons la liste de tous les genres avec ceux identifiés et nous gardons que ceux qui sont indenitifiés par le film
            var genre = [];
            arrayId.forEach(id => {
                            category.forEach(ids => {
                                    if (id === ids.id) {
                                      genre.push(ids.name);
                                    }
                                });
                            }
                          );
                          console.log(genre);
         return genre;             
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
  