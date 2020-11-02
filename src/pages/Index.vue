<template>
<div>
  <!-- <p>indrex</p> -->
  <q-page class="flex top">
    <div class="q-pa-md">
    <q-table
      grid
      title="Dishes"
      :data="foodData"
      :columns="columns"
      row-key="id"
      :filter="filter"
      hide-header
      :pagination.sync="pagination"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <q-card bordered class="q-ma-sm card-cover" style="max-width: 430px; min-width: 430px" >
          <div class="q-ma-sm" v-for="col in props.cols" :key="col.id" @click="setId(props, col)">
            <div v-if="col.label === 'Image'">
              <q-img :src='col.value' basic />
            </div>
            <div v-if="col.label === 'Title'">
              <div class="text-h6">
                {{col.value}}
              </div>
            </div>
          </div>
        </q-card>
      </template>
    </q-table>
    </div>
    <!-- <q-card bordered class="card-cover" v-for="food in foodData" :key="food.id"
     @click="$router.push({ path: `/view/${food.id}`})">
      <q-card-section class="section">
        <img :src="food.image" class="image"/>
        <div style="marginLeft: 20px">
          <div class="text-h6">{{food.title}}</div>
        </div>
      </q-card-section>
    </q-card> -->
  </q-page>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'image',
          required: true,
          label: 'Image',
          align: 'left',
          field: row => row.image,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'title', align: 'center', label: 'Title', field: 'title', sortable: true }
      ]
    }
  },
  computed: mapState({
    foodData: state => state.HomeData.foodData,
    currentCuisine: state => state.HomeData.currentCuisine,
    loading: state => state.HomeData.loading
  }),
  methods: {
    ...mapActions({ fetchFood: 'HomeData/fetchFoodData' }),
    ...mapMutations({ SET_CURRENTCUISINE: 'HomeData/SET_CURRENTCUISINE' }),
    setId (props, col) {
      this.$router.push({ path: `/view/${props.row.id}` })
    }
  },
  watch: {
    '$route.params.type': function (type) {
      this.fetchFood({ cuisine: this.$route.params.type })
    }
  },
  created () {
    // this.$store.dispatch('HomeData/fetchFoodData')
    this.fetchFood({ cuisine: this.$route.params.type })
    this.SET_CURRENTCUISINE(this.$route.params.type)
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
}
.card-cover {
    // height: 173px;
    // width: 90%;
    margin-bottom: 20px;
    cursor: pointer;
}
.section {
  display: flex;
  flex-direction: column;
}
.image {
  width: 100%;
  height: 250px;
  object-fit: contain;
}
</style>
