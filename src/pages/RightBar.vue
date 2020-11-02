<template>
<div>
    <b>CUISINES</b>
    <div class="tag_top">
        <span v-for="cuisine in cuisineList" :key="cuisine" @click="setCuisine(cuisine)"
        :class="[currentCuisine === cuisine ? 'tag-shadow' : '', 'label', 'bg-primary', 'text-white', 'tag']">{{cuisine}}</span>
    </div>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'RightBar',
  data () {
    return {}
  },
  methods: {
    ...mapMutations({ SET_CURRENTCUISINE: 'HomeData/SET_CURRENTCUISINE' }),
    setCuisine (val) {
      this.SET_CURRENTCUISINE(val)
      this.$router.push({ path: `/type/${val}` })
    }
  },
  computed: mapState({
    cuisineList: state => state.HomeData.cuisine,
    currentCuisine: state => state.HomeData.currentCuisine
  })
}
</script>
<style lang="scss" scoped>
.tag_top {
    margin: 20px 0 20px 0;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-gap: 10px;
}
.tag {
    margin-right: 5px;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;
}
.tag-shadow {
    background-color: green !important;
    box-shadow: 2px 2px 4px 4px #b9b3b3;
}
.label {
    padding: 5px 6px;
    border-radius: 15px;
}
</style>
