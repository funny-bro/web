<template>
  <div>
    <h2>
      <v-btn href='/history/list'> 執行記錄 </v-btn>
    </h2>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      hide-actions
    >
      <template slot="items" slot-scope="props">
          <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.index +1 }}</a></td>
          <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.item.cityName }}</a></td>
          <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.item.townName }}</a></td>
          <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.item.sectName }}</a></td>
          <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ getSta(props.item) }}</a></td>
          <td class="text-xs-left"><a :href='getUrl(props.item)'>{{ props.item.executedAt }}</a></td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'
import configMinix from '../../minixs/configMinix'
const cityConfig = require('../../configInit/city.json')

export default {
  mixins: [configMinix],
  async asyncData  ({ params, req }) {
      const res = await axios.get(`http://0.0.0.0:${req.connection.localPort}/api/section/recentExcuted`)

      const {data = []} = res

      data.forEach(element => {
        let cityName = cityConfig.find(el => el.code === element.cityCode).title

        let townConfig = require(`../../configInit/town_${element.cityCode}.json`)
        let townName = townConfig.find(el => el.code === element.townCode).title

        let sectConfig = require(`../../configInit/section_${element.cityCode}_${element.townCode}.json`)
        let sectName = sectConfig.find(el => el.value === element.sectCode).text

        element.cityName =  cityName
        element.townName =  townName
        element.sectName =  sectName
      });
      
      return {
        sectionList: data
      }
  },
  computed: {
    items : function(){
      const {sectionList} = this
      return sectionList
    },
  },
  data () {
    return {
      headers: [
        { text: 'No', value: 'no' },
        { text: '城市', value: 'cityName' },
        { text: '區域', value: 'townName' },
        { text: '路段', value: 'sectName' },
        { text: '統計', value: 'sta' },
        { text: '更新時間', value: 'executedAt' },
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