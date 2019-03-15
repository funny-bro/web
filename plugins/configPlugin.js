import Vue from 'vue'
import {withinNHour} from '../lib/date'
import axios from 'axios'

Vue.use({
  install: function (Vue, options) {
    Vue.mixin({
      mounted: async function () {
        const calConfigUpdatedAt = window.localStorage.getItem('calConfigUpdatedAt')
        const calConfigData = window.localStorage.getItem('calConfigData')

        if(withinNHour(calConfigUpdatedAt, 24) && calConfigData) {
          return this.initCalConfig()
        }

        await this.fetchCalConfig()
        return this.initCalConfig()
      },
      methods: {
        fetchCalConfig: async function(){
          console.log(' -=-=-= fetchCalConfig -=-=-=')
          const res = await axios('/api/system/calconfig')
          const calConfigData = JSON.stringify(res.data)
          const calConfigUpdatedAt = (new Date()).toISOString()

          window.localStorage.setItem('calConfigUpdatedAt', calConfigUpdatedAt)
          window.localStorage.setItem('calConfigData', calConfigData)
        },
        initCalConfig: function(){
          const calConfigData = window.localStorage.getItem('calConfigData')

          this.calConfig = JSON.parse(calConfigData)
        }
      },
      data: function(){
        return {
          calConfig: {}
        }
      }
    })
  }
})
