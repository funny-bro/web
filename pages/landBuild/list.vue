<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-container fluid>
        <v-layout column>
          <v-flex xs12>
            <div >
              <h1> {{items[0] && items[0].cityCode}} - {{items[0] && items[0].townCode}} - {{items[0] && items[0].sectCode}} </h1>
              <h2>{{ items.filter(item => item.isShow).length }} 建號 {{items.length}} 人</h2>
              <v-layout align-center justify-center column>
                
                <v-data-table
                  :headers="headers"
                  :items="items"
                  class="elevation-1"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-right">{{ props.item.isShow ? props.item.landBuild : '' }}</td>
                    <td class="text-xs-right">{{ props.item.isShow ? props.item.cityCode : '' }}</td>
                    <td class="text-xs-right">{{ props.item.isShow ? props.item.townCode : '' }}</td>
                    <td class="text-xs-right">{{ props.item.isShow ? props.item.sectCode : '' }}</td>
                    <td class="text-xs-right" :style='"{width: 100px}"'>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.order }}</td>
                    <td class="text-xs-right">{{ props.item.type }}</td>
                    <td class="text-xs-right">{{ props.item.isShow ? dateFormat(props.item.updatedAt) : '' }}</td>
                  </template>
                </v-data-table>

              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-container>

    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'
import dateUtil from '~/lib/date'

export default {
  async asyncData ({ params, req }) {
    const {updatedAtFrom, updatedAtEnd, cityCode, townCode, sectCode} = req.query

    const requestOptions = {
      params: {updatedAtFrom, updatedAtEnd, cityCode, townCode, sectCode}
    }  

    const res = await axios.get(`http://0.0.0.0:${req.connection.localPort}/api/landbuilds`, requestOptions)
    const landbuild = res.data
    return {
      landbuild,
      currentCityCode: cityCode,
      currentTownCode: townCode,
      currentSectCode: sectCode,
    }
  },
  computed: {
    items: function(){
      const arr = this.landbuild.map((item)=> {
        const {data, updatedAt, landBuild, section} = item
        const {cityCode, townCode, sectCode} = section

        try{
          return JSON.parse(data).map((itemData, index) => ({
              ...itemData,
              cityCode,
              townCode,
              sectCode,
              updatedAt,
              landBuild,
              // isShow: index === 0 
              isShow: true
            }))
        }
        catch(err){
          return []
        }
      })
      const flattenedArray = [].concat(...arr);  
      const personArr = flattenedArray.filter(item => item.name.includes('＊'))

      return personArr
    }
  },
  methods: {
    dateFormat: dateUtil.format,
    customFilter: function(a,b,c){
      console.log(a,b,c)
    }
  },
  data: function(){
    return {
      headers: [
        { text: '建號', value: 'landBuild' },
        { text: '城市', value: 'cityCode' },
        { text: '區號', value: 'townCode' },
        { text: '路段', value: 'sectCode' },
        {
          text: '債權人',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '次序', value: 'order' },
        { text: '抵押權', value: 'type' },
        { text: '更新時間', value: 'updatedAt' },
      ],
    }
  },
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>

<style scoped>
  .item {
    min-height: 50px;
    margin: 10px;
  }
</style>