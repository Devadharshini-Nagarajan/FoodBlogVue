<template>
    <div>
    <!-- <p>content</p> -->
    <q-card class="my-card" v-if="Object.keys(content).length !== 0">
      <img :src="content.image" class="image">
      <q-card-section>
        <div class="text-h4 mt">{{content.title}}</div>
        <div class="text-subtitle1">Ready in Minitues: {{content.readyInMinutes}} </div>
        <div class="text-subtitle1">vegetarian: {{content.vegetarian}}</div>
        <div class="text-subtitle1">Servings: {{content.servings}}</div>
        <div class="text-subtitle1">Occasions: {{dishTypeFormat(content.occasions)}}</div>
        <div class="text-subtitle1">Dish Types: {{dishTypeFormat(content.dishTypes)}}</div>
        <div class="text-h4 mt"><q-chip class="glossy" size="18px" square color="teal" text-color="white">Ingredients</q-chip></div>
<table v-if="ingredients.length > 0">
  <tr>
    <th>NAME</th>
    <th>METRIC</th>
    <th>US</th>
  </tr>
  <tr v-for="ing in ingredients" :key="ing.name">
    <td>{{ing.name}}</td>
    <td>{{ing.amount.metric.value}} {{ing.amount.metric.unit}}</td>
    <td>{{ing.amount.us.value}} {{ing.amount.us.unit}}</td>
  </tr>
</table>

        <div class="text-h4 mt"><q-chip class="glossy" size="18px" square color="teal" text-color="white">Instructions</q-chip></div>
        <div v-html="content.instructions"></div>
        <div class="text-h4 mt"><q-chip class="glossy" size="18px" square color="teal" text-color="white">Summary</q-chip></div>
        <div v-html="content.summary"></div>
      </q-card-section>
    </q-card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Content',
  data () {
    return {
      ingredients: []
    }
  },
  computed: mapState({
    content: state => state.HomeData.content
  }),
  methods: {
    ...mapActions({ fetchContent: 'HomeData/fetchContent' }),
    dishTypeFormat (dishes) {
      if (dishes) return dishes.toString()
    }
  },
  created () {
    console.log('yes')
    this.fetchContent({ id: this.$route.params.id })
    axios.get(`https://api.spoonacular.com/recipes/${this.$route.params.id}/ingredientWidget.json?apiKey=18081aad6c28450fbb3c57268e3d2ae8`)
      .then(res => {
        this.ingredients = res.data.ingredients
      })
      .catch(err => console.log(err))
  }
}
</script>
<style lang="scss" scoped>
.my-card {
    margin: 20px;
}
.mt {
    margin-top: 20px;
    margin-bottom: 10px;
}
.image {
    height: 300px;
    width: 80%;
    margin-left: 70px;
    // object-fit: cover;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
