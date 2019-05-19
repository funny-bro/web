<template>
<div>
  <v-layout
    row
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm10
      md12
      lg12
    >
      <form action="/landBuild/list" method='GET'>
        <div class='submitContainer'>
          <v-btn type="submit" class='submitButton' color="info">查詢</v-btn>
        </div>
        <v-container fluid>
          <div class='datePickerWrapper'>
            <date-picker name='updatedAtFrom' title='起始時間'/>
            <date-picker name='updatedAtEnd' title='結束時間'/> 
          </div>
          <v-layout col wrap>
            <v-flex md4 lg4 class='colContainer'>
              <span class='selectTitle'>{{ mappingCity || 'null' }}</span>
              <span class='countContainer'>{{ cityConfig.length || 0 }} 筆資料</span>
              <div class='scrollContainer'>
                <v-radio-group v-model="selectedCity" column name='cityCode'>
                  <v-radio
                    color="orange darken-3"
                    v-for='(cityItem, index) in cityConfig'
                    :label="`${cityItem.title} - ${getCityLandBuildMax(cityItem.code)}`"
                    :value="cityItem.code" 
                    :key='index'
                  />
                </v-radio-group>
              </div>
            </v-flex>

            <v-flex md4 lg4  class='colContainer'>
              <span class='selectTitle'>{{ mappingTown || 'null' }}</span>
              <span class='countContainer'>{{ filteredTownConfig(selectedCity).length || 0 }} 區 - 完成 {{getCityLandBuildPercent()}}%</span>
              <div class='scrollContainer'>
                <v-radio-group v-model="selectedTown" column name='townCode'>
                  <v-radio
                    color="orange darken-3"
                    v-for='(townItem, index) in filteredTownConfig(selectedCity)'
                    :label="`${townItem.title} - ${getTownLandBuildVal(townItem.code)} / ${getTownLandBuildMax(townItem.code)}`"
                    :value="townItem.code" 
                    :key='index'
                  />
                </v-radio-group>
              </div>
            </v-flex>

            <v-flex md4 lg4  class='colContainer'>
              <span class='selectTitle'>{{ mappingSection || 'null' }}</span>
              <span class='countContainer'>{{ filteredSectConfig(selectedTown).length || 0 }} 路段 - 完成 {{getTownLandBuildPercent()}}%</span>
              <div class='scrollContainer'>
                <v-radio-group v-model="selectedSect" column  name='sectCode'>
                  <v-radio
                    color="orange darken-3"
                    v-for='(sectItem, index) in filteredSectConfig(selectedTown)'
                    :label="`${sectItem.title} - ${getSectionLandBuildVal(sectItem.code)} / ${getSectionLandBuildMax(sectItem.code)}`"
                    :value="sectItem.code" 
                    :key='index'
                  />
                </v-radio-group>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import axios from 'axios'
import DatePicker from '@/components/DatePicker'
import configMinix from '../../minixs/configMinix'
  
const shortenNum = (num) => {
  if(!num) return 0

  if(num > 10000) return `${Math.ceil(num/10000)}萬`

  return num
}

export default {
  mixins: [configMinix],
  components: {
    DatePicker
  },
  async asyncData ({ params, req }) {
    const {cityConfig, townConfig, sectConfig} = (await axios.get(`http://0.0.0.0:${req.connection.localPort}/api/system`)).data
    return {
      cityConfig, townConfig, sectConfig
    }
    return {}
  },
  methods: {
    filteredCityConfig: function(){
      const {cityConfig = []} = this
      return cityConfig.map( ({code,title}) => ({value: code, text: title})) || []
    },
    filteredTownConfig: function(selectedCity = ''){
      const {townConfig = []} = this
      return townConfig.filter( item => item.code.includes(selectedCity)) || []
    },
    filteredSectConfig: function(selectedTown = ''){
      const {sectConfig = []} = this
      return sectConfig.filter( item => item.townCode === selectedTown) || []
    },
    getCityLandBuildPercent: function(_code = null) {
      const code = _code || this.selectedCity
      const calConfig = this.getCityCalConfig(code)

      if(!calConfig || !calConfig.landBuildMax) return 0

      const {landBuildMax, landBuildVal} = calConfig

      return Math.ceil(landBuildVal/landBuildMax)
    },
    getTownLandBuildPercent: function(_code = null){
      const townConfig = this.getTownCalConfig(_code)
      if(!townConfig || !townConfig.landBuildMax) return 0

      const {landBuildMax, landBuildVal} = townConfig

      return Math.ceil(landBuildVal/landBuildMax)
    },
    getCityLandBuildMax: function(_code = null){
      const code = _code || this.selectedCity
      const calConfig = this.getCityCalConfig(code)

      if(!calConfig || !calConfig.landBuildMax) return ''

      return shortenNum(calConfig.landBuildMax)
    },
    getTownLandBuildMax: function(_code = null){
      const townConfig = this.getTownCalConfig(_code)
      return shortenNum(townConfig.landBuildMax)
    },
    getTownLandBuildVal: function(_code = null){
      const townConfig = this.getTownCalConfig(_code)
      return shortenNum(townConfig.landBuildVal)
    },
    getSectionLandBuildMax: function(_code = null){
      const sectionConfig = this.getSectionCalConfig(_code)
      return shortenNum(sectionConfig.landBuildMax)
    },
    getSectionLandBuildVal: function(_code = null){
      const sectionConfig = this.getSectionCalConfig(_code)
      return shortenNum(sectionConfig.landBuildVal)
    },
    getTownLandBuildVal: function(_code = null){
      const townConfig = this.getTownCalConfig(_code)
      return shortenNum(townConfig.landBuildVal)
    },
    getCityCalConfig: function(code){
      const {calConfig} = this
      if(!calConfig || !calConfig.child) return ''

      return calConfig.child[code]
    },
    getTownCalConfig: function(_code){
      const cityCode = this.selectedCity
      const code = _code || this.selectedTown
      const {calConfig} = this
      if(!cityCode || !calConfig || !calConfig.child) return {}

      const townConfig = calConfig.child[cityCode].child[code]
      return townConfig
    },
    getSectionCalConfig: function(_code){
      const cityCode = this.selectedCity
      const townCode = this.selectedTown
      const code = _code || this.selectedSect
      const {calConfig} = this

      console.log(cityCode, townCode, code)

      if(!code || !calConfig || !calConfig.child) return {}

      const sectionConfig = calConfig.child[cityCode].child[townCode].child[code]
      return sectionConfig
    }
  },
  computed: {
    mappingSection: function(){
      const {selectedSect = '', sectConfig = []} = this
      const result = sectConfig.find( item => item.code === selectedSect) || {}
      return result.title || '...'
    },
    mappingTown: function(){
      const {selectedTown = '', townConfig = []} = this
      const result = townConfig.find( item => item.code === selectedTown) || {}
      return result.title || '...'
    },
    mappingCity: function(){
      const {selectedCity = '', cityConfig = []} = this
      const result = cityConfig.find( item => item.code === selectedCity) || {}
      return result.title || '...'
    }
  },
  data: function(){
    const selectedCity = this.cityConfig && this.cityConfig[0] && this.cityConfig[0].code || 'F'
    const filteredTownconfig = this.filteredTownConfig(selectedCity)[0]
    const selectedTown =  filteredTownconfig && filteredTownconfig.code || 'F05'
    const filteredSectConfig = this.filteredSectConfig(selectedTown)[0]
    const selectedSect = filteredSectConfig && filteredSectConfig.code || '1787'

    return {
      selectedCity,
      selectedTown,
      selectedSect
    }
  },
  watch: {
    selectedCity: function () {
      const {selectedCity} = this
      const filteredTownconfig = this.filteredTownConfig(selectedCity)[0]
      const selectedTown =  filteredTownconfig && filteredTownconfig.code || 'A15'

      const filteredSectConfig = this.filteredSectConfig(selectedTown)[0]
      const selectedSect = filteredSectConfig && filteredSectConfig.code || '0953'

      this.selectedTown = selectedTown
      this.selectedSect = selectedSect
    },
    selectedTown: function () {
      const {selectedTown} = this

      const filteredSectConfig = this.filteredSectConfig(selectedTown)[0]
      const selectedSect = filteredSectConfig && filteredSectConfig.code || '0953'

      this.selectedSect = selectedSect
    }
  }
}
</script>

<style scoped>
.colContainer {
  padding: 0 5px;
}
.selectTitle {
  background-color: #222222;
  width: 100%;
  display: block;
  margin: 20px 0;
  padding: 10px;
  text-align: center;
}
.cityContainer{

} 
.scrollContainer {
  height: 80vh;
  overflow-y: scroll;
  background-color: #222222;
  padding: 0 15px;
}
.countContainer {
  display: block;
  padding: 10px 0;
}
.submitContainer{
  display: flex;
}
.submitButton {
  margin-left: auto;
  margin-right: 25px;
}
.datePickerWrapper{
  display: flex;
}
</style>