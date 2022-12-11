<template>
  <div>
    <search-films/>
  </div>
  <div class="wrapper__main">
    <div :key="item.id" v-for="item in results" @click="$router.push(`/film/${item.id}`)" class="wrapper__film">
        <img :src='img_url + item.poster_path'>
        <div class="overview">
          <h3>{{item.original_title}}</h3>
            <div class="wrapper__vote">
              <span v-if='(item.vote_average <= 4.8)' class=" vote vote__red">{{item.vote_average}}</span>
              <span v-else-if='(item.vote_average > 4.8) && (item.vote_average <= 6.8)' class=" vote vote__orange">{{item.vote_average}}</span>
              <span v-else-if='(item.vote_average > 6.8)' class=" vote vote__green">{{item.vote_average}}</span>
          </div>
        </div> 
      </div>
    </div>
  </template>
  
<script>
import SearchFilms from '@/components/SearchFilms.vue';

  export default {
    components: {
      SearchFilms
    },
    data() {
      return  {
        api_key: 'api_key=d9081edd06b9602f2c84bede66f719e3',
        base_url: 'https://api.themoviedb.org/3',
        api_url: '/discover/movie?sort_by=popularity.desc&',
        result_api: '',
        title: '',
        poster_path: '',
        vote_average: '',
        id: '',
        results: [],
        img_url: 'https://image.tmdb.org/t/p/w500',

      }
    },
    methods: {
      get_result_api() {
        this.result_api = this.base_url + this.api_url + this.api_key;
        fetch(this.result_api).then(res => res.json()).then(data => {
          this.results = data.results
        })
      },
    },
    mounted() {
      this.get_result_api()
    },
  }
  </script>
  

<style scoped>
  @font-face {
    font-family: "Oswald";
    src: local("Oswald"), url(@/fonts/Oswald-Light.ttf) format("truetype");
  }

  * {
    margin: 0;
    padding: 0;
    background: #373b69;
    font-family: 'Oswald';
  }

  .wrapper__main {
    width: 100%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    background: #22254b;
    padding: 20px;
  }

  .wrapper__film {
    height: 37vw;
    width: 22vw;
    margin-bottom: 70px;
    margin-top: 20px;
    background: #373b69;
    padding-bottom: 5px;
    color: white;
    margin-bottom: 100px;

  }

  img {
    width: 100%;
    height: 100%;
  }

  .vote__green {
    color: #00FC87;
  }

  .vote__orange {
    color: #e58f2c;
  }

  .vote__red {
    color: #8B0000;
  }

  .wrapper__vote {
    display: flex;
    justify-content: end;
  }

  .overview {
    padding: 15px;
  }

  @media screen and (max-width:1000px) {
    .wrapper__film {
      height: 45vh;
      width: 22vw;
    }
  }

  @media screen and (max-width:910px) {
    .wrapper__main {
      grid-template-columns: 33% 33% 33%;
    }

    .wrapper__film {
      height: 50vh;
      width: 29vw;
    }
  }

  @media screen and (max-width:800px) {
    .wrapper__main {
      grid-template-columns: 33% 33% 33%;
    }

    .wrapper__film {
      height: 50vh;
      width: 30vw;
    }
  }

  @media screen and (max-width:650px) {
    .wrapper__main {
      grid-template-columns: 50% 50%;
    }

    .wrapper__film {
      height: 58vh;
      width: 45vw;
    }
  }

  @media screen and (max-width:550px) {
    .wrapper__main {
      grid-template-columns: 100%;
    }

    .wrapper__film {
      height: 80vh;
      width: 92vw;
    }
  }

</style>