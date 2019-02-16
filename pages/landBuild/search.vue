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
          <v-btn type="submit" class='submitButton' color="info">送出</v-btn>
        </div>
        <v-container fluid>
          <date-picker name='updatedAt'/>
          <v-layout col wrap>
            <v-flex md4 lg4 class='colContainer'>
              <span class='selectTitle'>{{ mappingCity || 'null' }}</span>
              <span class='countContainer'>{{ cityConfig.length || 0 }} 筆資料</span>
              <div class='scrollContainer'>
                <v-radio-group v-model="selectedCity" column name='cityCode'>
                  <v-radio
                    color="orange darken-3"
                    v-for='(cityItem, index) in cityConfig'
                    :label="cityItem.title"
                    :value="cityItem.code" 
                    :key='index'
                  />
                </v-radio-group>
              </div>
            </v-flex>

            <v-flex md4 lg4  class='colContainer'>
              <span class='selectTitle'>{{ mappingTown || 'null' }}</span>
              <span class='countContainer'>{{ filteredTownConfig(selectedCity).length || 0 }} 筆資料</span>
              <div class='scrollContainer'>
                <v-radio-group v-model="selectedTown" column name='townCode'>
                  <v-radio
                    color="orange darken-3"
                    v-for='(townItem, index) in filteredTownConfig(selectedCity)'
                    :label="townItem.title"
                    :value="townItem.code" 
                    :key='index'
                  />
                </v-radio-group>
              </div>
            </v-flex>

            <v-flex md4 lg4  class='colContainer'>
              <span class='selectTitle'>{{ mappingSection || 'null' }}</span>
              <span class='countContainer'>{{ filteredSectConfig(selectedTown).length || 0 }} 筆資料</span>
              <div class='scrollContainer'>
                <v-radio-group v-model="selectedSect" column  name='sectCode'>
                  <v-radio
                    color="orange darken-3"
                    v-for='(sectItem, index) in filteredSectConfig(selectedTown)'
                    :label="sectItem.title"
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

export default {
  components: {
    DatePicker
  },
  async asyncData ({ params, req }) {
    const {cityConfig, townConfig, sectConfig} = (await axios.get(`http://${req.connection.remoteAddress}:3000/api/system`)).data
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
    const selectedCity = this.cityConfig && this.cityConfig[0] && this.cityConfig[0].code || 'A'
    const filteredTownconfig = this.filteredTownConfig(selectedCity)[0]
    const selectedTown =  filteredTownconfig && filteredTownconfig.code || 'A15'
    const filteredSectConfig = this.filteredSectConfig(selectedTown)[0]
    const selectedSect = filteredSectConfig && filteredSectConfig.code || '0953'

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
</style>