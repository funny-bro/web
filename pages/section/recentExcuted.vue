<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.cityName }}</td>
        <td class="text-xs-left">{{ props.item.townName }}</td>
        <td class="text-xs-left">{{ props.item.sectName }}</td>
        <td class="text-xs-left">{{ props.item.executedAt }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

const cityConfig = require('../../configInit/city.json')

export default {
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
        { text: '城市', value: 'cityName' },
        { text: '區域', value: 'townName' },
        { text: '路段', value: 'sectName' },
        { text: '更新時間', value: 'executedAt' },
      ]
    }
  }
}

</script>