<template>
  <div class='rowContainer'>
    <div class='selectionContainer'>
      <section-select v-bind='{cityConfig, townConfig, sectConfig}' @onChange='handleSelect'/>
    </div>
    <div class='contentContainer'>
      <conten-form v-if='section && section.id' v-bind='{cityConfig, townConfig, sectConfig, section}'/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SectionSelect from '@/components/SectionSelect'
import ContenForm from '@/components/SectionSelect/ContenForm'

export default {
  components: {
    SectionSelect,
    ContenForm
  },
  async asyncData ({ params, req }) {
    const {cityConfig, townConfig, sectConfig} = (await axios.get(`http://0.0.0.0:${req.connection.localPort}/api/system`)).data
    return {
      cityConfig, townConfig, sectConfig
    }
  },
  methods: {
    fetchSection: async function(cityCode = '', townCode = '', sectCode = ''){
      const requestOptions = {
        params: {cityCode, townCode, sectCode}
      }  
      const response = await axios.get(`/api/section`, requestOptions)
      return response.data || {}
    },
    handleSelect: async function(city, town, sect){
      this.cityCode = city
      this.townCode = town
      this.sectCode = sect
      this.section = {}


      if(city && town && sect) {
        const response =  (await this.fetchSection(city, town, sect))
        this.section = {...response}
        return 
      }
    }
  },
  computed: {
  },
  data: function(){
    return {
      cityCode: '',
      townCode: '',
      sectCode: '',
      section: {}
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.rowContainer{
  width: 80vw;
  display: flex;
  margin: auto;
}
.selectionContainer {
  width: 70%;
}
.contentContainer {
  width: 30%;
  margin-top: 50px;
}

</style>