import axios from 'axios'

export function fetchFoodData (context, params) {
  context.commit('SET_LOADING', true)
  const url =
    params.cuisine === 'all'
      ? 'https://api.spoonacular.com/recipes/random?apiKey=18081aad6c28450fbb3c57268e3d2ae8&number=100'
      : `https://api.spoonacular.com/recipes/complexSearch?apiKey=18081aad6c28450fbb3c57268e3d2ae8&cuisine=${params.cuisine}&number=100`
  axios
    .get(url)
    .then(res => context.commit('SET_FOODDATA', params.cuisine === 'all' ? res.data.recipes : res.data.results))
    .catch(err => console.log(err))
    .finally((_) => context.commit('SET_LOADING', false))
}

export function fetchContent (context, params) {
  context.commit('SET_LOADING', true)
  const url = `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=18081aad6c28450fbb3c57268e3d2ae8`
  axios
    .get(url)
    .then(res => context.commit('SET_CONTENT', res.data))
    .catch(err => console.log(err))
    .finally((_) => context.commit('SET_LOADING', false))
}
