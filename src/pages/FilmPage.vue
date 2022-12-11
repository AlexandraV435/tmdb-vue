<template>
<div class="body" :style="{'background-image':`url(${this.background_img})` }">
<div class="background">
</div>
<div class="search__films__input">
  <search-films/>
</div>
  <main>
    <div class="wrapper">
      <div class="wrapper__image">
        <img :src='img_url + poster_path' alt="" class="poster__image">
      </div>

      <div class="wrapper__description">
        <div>
          <h1>{{original_title}}</h1>
          <p class="tagline">{{tagline}}</p>
        </div>

        <div class="wrapper__overview">
          <p>{{overview}}</p>
        </div>

        <div class="wrapper__genres">
          <div v-for='(genre, i) in genres' :key="genre.id">
            <p>{{genre.name}}{{(i < genres.length - 1 ? ',' : '')}}</p>
          </div>
        </div>

        <div class="wrapper__companies">
          <div>
            <p>{{production_companies}}</p>
          </div>
        </div>
        <footer>

          <div class="footer wrapper__one">
            <div>
              <p class="desc__const">Original Reliase:</p>
              <p class="desc">{{release_date}}</p>
            </div>

            <div>
              <p class="desc__const">Box Office:</p>
              <p class="desc">${{revenue}}</p>
            </div>
          </div>

          <div class="footer wrapper__two">
            <div>
              <p class='desc__const'>Runnig time:</p>
              <p class="desc">{{runtime}} mins</p>
            </div>

            <div>
              <p class="desc__const">Vote Avarage:</p>
              <p class="desc">{{vote}}/10</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </main>
</div>

</template>

<script>
import SearchFilms from '@/components/SearchFilms.vue';

export default {
  components: {
      SearchFilms
  },
  data() {
    return {
      id: this.$route.params.id,
      def_url: 'https://api.themoviedb.org/3/movie/',
      api_key: 'api_key=d9081edd06b9602f2c84bede66f719e3',
      result_api: '',
      img_url: 'https://image.tmdb.org/t/p/w500/',
      img: '',
      genres: {},
      poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
      original_title: '',
      release_date: '',
      revenue: '',
      runtime: '',
      tagline: '',
      overview: '',
      vote: '',
      background_img: '',
      production_companies: []
    }
  },
  methods: {
    get_film() {
      this.result_api = this.def_url + this.id + '?&' + this.api_key;
      fetch(this.result_api).then(res => res.json()).then(data => {
        data;
        this.img = data.backdrop_path;
        this.genres = data.genres;
        this.poster_path = data.poster_path;
        this.original_title = data.original_title.toUpperCase();
        this.release_date = data.release_date;
        this.revenue = data.revenue;
        this.runtime = data.runtime;
        this.tagline = data.tagline;
        this.overview = data.overview;
        this.vote = data.vote_average;
        this.background_img = this.img_url + data.backdrop_path;
        toString(data.production_companies.forEach(elem => this.production_companies += elem.name));
        this.production_companies = this.production_companies.replaceAll(' ', ', ');
      })
    }

  },
  mounted() {
    this.get_film()
  }
}
</script>

<style scoped>
  @font-face {
    font-family: "Lato_light";
    src: local("Lato_light"), url(@/fonts/Lato-Light.ttf) format("truetype");
  }

  @font-face {
    font-family: "Lato_bold";
    src: local("Lato_bold"), url(@/fonts/Lato-Bold.ttf) format("truetype");
  }

  @font-face {
    font-family: "Oswald";
    src: local("Oswald"), url(@/fonts/Oswald-Light.ttf) format("truetype");
  }

* {
  font-family: Lato_light;
}
.search__films__input {
  position: relative;
}
  .body {
    height: 100vh;
    background: no-repeat;
    background-size: cover;
    box-shadow: inset 0px 143px 54px -26px rgba(0,0,0,0.59), inset 0px -133px 61px -33px rgba(0,0,0,0.59);;
  }
  .background {
    position: absolute;
    background: black;
    opacity: 0.7;
    width: 100vw;
    height: 100vh;
  }

main {
  position: relative;
  color: white;
  width: 64%;
  margin: 0 auto;
  border-radius: 3px;
  height: 580px;
  min-width: 800px;
}
.wrapper__image img{
  width: 390px;
  height: 580px;
  border-radius: 3px 0 0 3px;
}
.wrapper, .wrapper__genres {
  display: flex;
}
.wrapper__genres div{
  padding-right: 5px;
  color: #00FC87;
}
.wrapper__genres p{
  font-family: Oswald;
  font-size: 22px;
}
.wrapper__description {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 30px 30px 0 30px;
  box-sizing: border-box;
}
.wrapper__description h1 {
  font-size: 40px;
}

.tagline {
  color: #00FC87;
  font-family: Oswald;
  font-size: 21px;
  letter-spacing: 0.8px;
  margin: 10px 0 10px 0;
}

.wrapper__overview p {
  line-height: 1.4;
  margin-bottom: 30px;
}

.wrapper__companies {
  display: flex;
}
.wrapper__companies p {
  font-family: Oswald;
  font-size: 16px;
  margin-top: 3px;
  margin-bottom: 30px;
}

footer {
  display: flex;
}
.wrapper__two {
  margin: 0 auto;
}
.desc__const {
  font-family: Oswald;
}
.desc {
  color:#00FC87;
  font-size: 23px;
  font-family: Oswald;
}

@media screen and (max-width: 830px){
   .wrapper {
      display: flex;
      flex-direction: column-reverse;
      margin: 0 auto;
      width: 70vw;
   }

   footer {
    padding-bottom: 20px
   }

   .wrapper__image img {
      width: 80%;
      height: 90%;
      margin: 0 auto;
   }

   .wrapper__image {
      display: flex;
   }
   .wrapper__description {
      border-radius: 5px;
   }
   .body {
      box-shadow: 0px -44px 38px 8px rgba(0,0,0,0.85) inset;
   }

   main {
    position: relative;
    color: white;
    width: 64%;
    margin: 0 auto;
    border-radius: 3px;
    height: 580px;
    min-width: 0;
  }
}


</style>