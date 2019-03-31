<template>
  <div>
    <v-layout
      column
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm8
        md8
      >
        <v-data-table
          :headers="headers"
          :items="historyList"
          class="elevation-1"
          hide-actions
        >
          <template slot="items" slot-scope="props">
              <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.index +1 }}</a></td>
              <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.item.count }}</a></td>
              <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.item.updatedAt }}</a></td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'
import {format} from '../../lib/date'

export default {
  async asyncData  ({ params, req }) {
      const res = await axios.get(`http://0.0.0.0:${req.connection.localPort}/api/history`)

      const {data = []} = res

      const historyList = data.map( item => {
        const {count, updatedAt} = item
        const _up = format(updatedAt)
        return {count, updatedAt: _up}
      })
      
      return {
        historyList
      }
  },
  computed: {
  },
  data () {
    return {
      headers: [
        { text: 'No', value: 'no' },
        { text: '執行路段數', value: 'count' },
        { text: '更新時間', value: 'updatedAt' },
      ]
    }
  },
  methods: {
    getUrl: function(item){
      const {cityCode, townCode, sectCode} = item
      return `/landBuild/list?updatedAt=02-13-2019&cityCode=${cityCode}&townCode=${townCode}&sectCode=${sectCode}`
    },
    getSta: function(item){
      const {calConfig = {}} = this
      const {cityCode, townCode, sectCode} = item

      if(!calConfig || !calConfig.child || !calConfig.child[cityCode]) return '-'

      const sectionConfig = calConfig.child[cityCode].child[townCode].child[sectCode]
      const {landBuildMax, landBuildVal} = sectionConfig
      return `${landBuildVal}/${landBuildMax}`
    }
  }
}

</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>