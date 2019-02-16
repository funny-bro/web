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
            <div class="resultContainer">
              <v-layout align-center justify-center column>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  class="elevation-1"
                  hide-actions
                >
                  <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.cityCode }}</td>
                    <td class="text-xs-right">{{ props.item.townCode }}</td>
                    <td class="text-xs-right">{{ props.item.sectCode }}</td>
                    <td class="text-xs-right">{{ props.item.landBuild }}</td>
                    <td class="text-xs-right">{{ props.item.order }}</td>
                    <td class="text-xs-right">{{ props.item.type }}</td>
                    <td class="text-xs-right">{{ props.item.updatedAt }}</td>
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
    const url = `http://${req.connection.remoteAddress}:3000/api/landbuilds`
    const res = await axios.get(url)
    const landbuild = res.data
    return {
      landbuild
    }
  },
  computed: {
    items: function(){
      const arr = this.landbuild.map((item)=> {
        const {data, updatedAt, landBuild, section} = item
        const {cityCode, townCode, sectCode} = section

        return JSON.parse(data).map(itemData => ({
            ...itemData,
            cityCode,
            townCode,
            sectCode,
            updatedAt: dateUtil.format(updatedAt),
            landBuild
          }))
      })

      const flattenedArray = [].concat(...arr);  
      const personArr = flattenedArray.filter(item => item.name.includes('＊'))

      return personArr
    }
  },
  data: function(){
    return {
      headers: [
        {
          text: '戶主',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '城市', value: 'cityCode' },
        { text: '區號', value: 'townCode' },
        { text: '路段', value: 'sectCode' },
        { text: '建號', value: 'landBuild' },
        { text: 'Calories', value: 'order' },
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
  .resultContainer {
    height: 350px;
  }

  .item {
    min-height: 50px;
    min-width: 80px;
    margin: 10px;
  }
</style>