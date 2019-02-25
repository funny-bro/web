<template>
  <v-flex
    xs12
    sm10
    md12
    lg12
  >
      <v-container fluid>
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
  </v-flex>
</template>

<script>
export default {
  props: {
    cityConfig: {
      type: Array,
      default: []
    },
    townConfig: {
      type: Array,
      default: []
    },
    sectConfig: {
      type: Array,
      default: []
    },
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
    },
    selectedSect: function(){
      this.$emit('onChange', this.selectedCity, this.selectedTown, this.selectedSect)
    }
  }
}
</script>

<style scoped>
.selectionContainer {

}
.contentContainer {

}
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
</style>