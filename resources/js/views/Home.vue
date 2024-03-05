<template>
  <div>
    <p>{{appelApi}}</p>
    <q-btn color="secondary" label="Prêt pour appel api"  @click="sendApi"/>
    <h1>{{ backApi }}</h1>
    <q-btn color="deep-orange" glossy label="Reset message api" @click="resetApi"/>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      appelApi: "Test appel api !",
      backApi: "Avant retour api"
    }
  },
  methods: {
    async sendApi() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api');        
        console.log(response.data);
        this.backApi = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    },
    resetApi() {
      this.backApi = "Avant retour api";
    }
  }
}
</script>