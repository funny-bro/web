<template>
  <v-app dark>
    <v-content>
      
      <!-- <v-navigation-drawer permanent floating light>
        <v-list dense class="pt-0">
          <v-list-tile v-for="i in 3" :to="{path: '/page' + i}" :key='i'>
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <a href='/'>Page {{ i }}</a>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>     
      </v-navigation-drawer> -->


      <v-toolbar>
        <v-toolbar-title>ZD</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
           <v-btn flat href='/section/recentExcuted'>最近更新</v-btn>
           <v-btn flat href='/user'>帳號管理</v-btn>
           <v-btn flat href='/schedule'>時間安排</v-btn>
           <v-btn flat href='/landbuild/search'>建號報告</v-btn>
          <v-btn flat href='/section'>建號編緝</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style scoped>
.headerWrapper {
  height: 80px;
  text-align: center;
  line-height: 80px;
  background: black;
  font-size: 30px;
}
</style>