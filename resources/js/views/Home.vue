<template>
  <div>
    <p>{{ appelApi }}</p>
    <q-btn color="secondary" label="Prêt pour appel api"  @click="sendApi"/>
    <q-card class="my-card">
      <q-img :src="url">
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ title }}
        </div>
        <p>{{ synopsis }}</p>
      </q-img>
    </q-card>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      appelApi: "Test appel api !",
      title: '',
      synopsis: '',
      url : 'https://api.themoviedb.org/3/search/movie'
    }
  },
  methods: {
    async sendApi() {
        const response = await axios({
                                        method: 'get',
                                        url: this.url,
                                        params: {
                                          query: 'barbie',
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
        console.log(response.title);
        this.title = response.title;
    }
  }
}
</script>