<template>
    <div class="main__wrapper">
        <img id='tmdb'
         @click="$router.push('/')"
         src="https://camo.githubusercontent.com/3473ad272177937efdaea24da61c7a9204540ef4a3eccace1fed89403805191c/68747470733a2f2f7777772e7468656d6f76696564622e6f72672f6173736574732f322f76342f6c6f676f732f343038783136312d706f77657265642d62792d72656374616e676c652d677265656e2d626234333031633130646463373439623465373934363338313161363861666562656165363665663433643137626366643866663065363064656437636539392e706e67" alt="">
        <div class="wrapper__input">
            <form class='form' action="" @submit.prevent>
                <input type="text"
                id="search"
                class="search"
                placeholder="Search Movie Title..."
                v-model="title_film"
                @keyup.enter="search_film()">
                <div class="results" v-show="show_results">
                    <p v-for="item in results" 
                    :key="item.id"
                    @click="find_film(item.id)"
                    >{{item.original_title}} - {{item.release_date.slice(0, 4)}}</p>
                </div>
            </form>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                search_url: '',
                title_film: '' ,
                api_key: 'api_key=d9081edd06b9602f2c84bede66f719e3',
                base_url: 'https://api.themoviedb.org/3',
                api_url: '/discover/movie?sort_by=popularity.desc&', 
                results: [],
                show_results: false,
            }
        },
        methods: {
            search_film() {
                this.search_url = this.base_url + '/search/movie?' + this.api_key + '&query=' + this.title_film;
                fetch(this.search_url).then(res => res.json()).then(data => {
                    this.results = data.results;
                    console.log(this.results)
                })
                this.show_results = true
            },
            find_film(id) {
                this.$router.push(`/film/${id}`)
                setTimeout(() => {
                location.reload();
                }, 100)
            },
        }
    }
</script>

<style scoped>
@font-face {
    font-family: "Lato_light";
    src: local("Lato_light"), url(@/fonts/Lato-Light.ttf) format("truetype");
  }

input {
  background-color: transparent;
  outline: none;
  font-family: Lato_light;
  color: #ccc;
  font-weight: 100;
  bottom: 2px;
  font-size: 14.5px;
  width: 90%;
  border: none;
  margin-right: 24.5vw;
  border-bottom: solid 1px white;
}

::placeholder {
  padding-left: 10px;
  padding-bottom: 10px;
}
.wrapper__input {
    margin-left: 16vw;
    margin-top: 50px;
}

img {
    width: 140px;
    height: 60px;
    margin: 27px 0 0 80px
}

.main__wrapper {
    display: flex;
    flex-direction: row;
    padding-bottom: 30px;
    margin-left: 13vw;
}

.results {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 300px;
    color: white;
    height: auto;
    max-height: 200px;
    padding: 10px;
    z-index: 4;
    align-items: flex-end;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 0 0 5px 5px;
    overflow: auto;
}
.results p {
    margin-top: 5px;
    margin-bottom: 5px;
    z-index: 4;
    border-bottom: 1.6px solid rgb(24, 24, 24)
} 

@media screen and (max-width: 775px) {
  .results {
        width: 30%;
        min-width: 200px
    }   
}

@media screen and (max-width: 595px) {
    img {
        margin: 27px 0 0 0
    }
}



</style>
