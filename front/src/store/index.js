import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const apiService = axios.create({
  baseURL: process.env.VUE_APP_API_BASE || '',
  transformRequest: [
    (data, headers) => {

      const pass = localStorage.getItem('pass');
      if (pass)
        headers["Authorization"] = `${pass}`;



      return data;
    },
    ...axios.defaults.transformRequest
  ],
})

export default new Vuex.Store({
  state: {
    request: '',
    categoriesDialogue: false,
    createPostDialog: false,
    deletePostDialog: false,
    createCategoryDialog: false,
    deleteCategoryDialog: false,
    postsOnPage: 6,
    filter: '',
    weather: {},
    exchange: {},
    backs: [],
    categories: [],
    posts: [],
    currentPostsComments: [],
  },
  mutations: {
    setCategoriesDialog(state, val) {
      state.categoriesDialogue = val
    },
    changeNews(state, val) {
      state.postsOnPage += val
    },
    setPosts(state, posts) {
      state.posts = posts

    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setFilter(state, category) {
      state.filter = category
    },
    setBacks(state, backs) {
      state.backs = backs
    },
    setSearchRequest(state, request) {
      state.request = request
    },
    setWeather(state, data) {
      state.weather = data
    },
    setExchange(state, data) {
      state.exchange = data
    },
    setComments(state, data) {
      state.currentPostsComments = data
    },
  },
  actions: {
    fetchComments({ commit }, post_id) {
      return apiService(`/api/comments/${post_id}`, {
        method: "GET"
      })
        .then((response) => {
          commit('setComments', response.data);
        })

    },
    fetchCategories({ commit }) {
      return apiService('/api/categories', {
        method: "GET"
      })
        .then((response) => {
          commit('setCategories', response.data);

        })

    },
    fetchData({ commit }) {
      return apiService('/api/posts/', {
        method: "GET"
      })
        .then((response) => {

          const posts = response.data.map(post => {
            post.id = post._id
            post.media = post.media.map(x => {
              return process.env.VUE_APP_STATIC_BASE + x
            })
            post.video = post.video.map(x => {
              return process.env.VUE_APP_STATIC_BASE + x
            })
            return post
          })
          let currentIndex = posts.length, randomIndex;

          // While there remain elements to shuffle...
          while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [posts[currentIndex], posts[randomIndex]] = [
              posts[randomIndex], posts[currentIndex]];
          }
          commit('setPosts', posts);
          return posts;
        })

    },
    fetchWeather({ commit }) {
      return apiService('/api/weather', {
        method: "GET"
      })
        .then((response) => {
          const weather = response.data
          commit('setWeather', weather);
          return weather;
        })

    },
    fetchExchange({ commit }) {
      return apiService('/api/exchange', {
        method: "GET"
      })
        .then((response) => {
          const exchange = response.data
          commit('setExchange', exchange);
          return exchange;
        })

    },
    fetchBacks({ commit }) {
      return apiService('/api/backs', {
        method: "GET"
      })
        .then((response) => {
          const backs = response.data
          commit('setBacks', backs);
          return backs;
        })

    },
    async createPost(context, post) {
      const media = post.media
      delete post.media
      await apiService.post("/api/posts/", post)
        .then(async response => {
          const id = response.data._id
          for (var i = 0; i < media.length; i++) {
            var formData = new FormData();
            formData.append("media", media[i]);
            await apiService.post(`/api/posts/${id}/add-media`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
          }
        });
      context.dispatch('fetchData')
    },
    createCategory(context, category) {
      apiService.post("/api/categories/", category)
      context.dispatch('fetchCategories')
    },
    async createComment(context, { comment, post_id }) {
      await apiService.post("/api/comments", comment)
      context.dispatch('fetchComments', post_id)
    },
    async createBack(context, media) {
      await apiService.post("/api/backs/", media)
        .then(async response => {
          const id = response.data._id
          var formData = new FormData();
          formData.append('src', media);
          await apiService.post(`/api/backs/${id}/add-media`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        })
      context.dispatch('fetchBacks')

    },
    async deleteCategories(context, categories) {
      for (var i = 0; i < categories.length; i++) {
        await apiService.delete(`/api/categories/${categories[i]}`)
      }
      context.dispatch('fetchCategories')
    },
    async deleteBacks(context, backs) {
      for (var i = 0; i < backs.length; i++) {
        await apiService.delete(`/api/backs/${backs[i]}`)
      }
      context.dispatch('fetchBacks')
    },

    async deletePosts(context, posts) {
      for (var i = 0; i < posts.length; i++) {
        await apiService.delete(`/api/posts/${posts[i]}/delete-media`)
        await apiService.delete(`/api/posts/${posts[i]}`)
      }
      context.dispatch('fetchData')
    },
    async deleteComment(context, config) {
      await apiService.delete(`/api/comments/${config.id}`)
      context.dispatch('fetchComments', config.post_id)

    },
    async checkPassword() {
      return await apiService.post('/api/check-pass')
    },




  },
  getters: {
    filteredPosts(state) {
      let filteredPosts = state.posts
      // let searchPosts = []
      if (state.filter != '') {
        filteredPosts = filteredPosts.filter(x => {
          return x.subcategory == state.filter
        })
      }
      if (state.request != '') {
        filteredPosts = filteredPosts.filter((post) =>
          state.request.split(" ").map((word) =>
            post.title.match(new RegExp(`(^| )+(${word})`, "i"))
          )
            .every((x) => x)
        );
      }

      return filteredPosts

    },
    adsCategories(state) {
      return state.categories.filter((x) => x.type == 'Реклама')
    },
    newsCategories(state) {
      return state.categories.filter((x) => x.type == 'Новость')
    },
    news(state) {
      return state.posts.filter((x) => x.category == 'new')
    },
    adds(state) {
      return state.posts.filter((x) => x.category == 'add')
    },
    slides(state) {
      return state.posts.filter((x) => x.isMain == true)
    },

    cutedPosts(state, getters) {
      return getters.filteredPosts.slice(0, state.postsOnPage)
    },
    oldPosts(state) {
      var array = state.posts.filter((x) => {
        return x.type == 'Реклама'
      })
      return array.slice(0, 3)
    },
    newPosts(state) {
      var array = state.posts.filter((x) => {
        return x.type == 'Новость'
      })
      return array.slice(0, 3)
    }


  },
  modules: {
  }
})
