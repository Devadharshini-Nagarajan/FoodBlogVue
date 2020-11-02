<template>
  <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <q-toolbar-title @click="seturl" style="cursor: pointer">Food Blog</q-toolbar-title>
        </q-toolbar>
      </q-header>
       <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        bordered
        :width="400"
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <RightBar></RightBar>
          </div>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import RightBar from '../pages/RightBar'

export default {
  name: 'MainLayout',
  components: { RightBar },
  data () {
    return {
      drawerRight: true
    }
  },
  computed: mapState({
    currentCuisine: state => state.HomeData.currentCuisine
  }),
  methods: {
    seturl () {
      if (this.$route.params.type !== this.currentCuisine) {
        this.$router.push({ path: `/type/${this.currentCuisine}` })
      }
    }
  }
}
</script>
