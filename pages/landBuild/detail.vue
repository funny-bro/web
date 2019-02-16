<template>
<div>
  detail
  {{cityCode}} {{townCode}} {{sectCode}}

  <v-form
    v-model="valid"
    lazy-validation
    ref="form"
  >
    <v-text-field
      :value="mappingCity"
      label="城市"
      disabled
    ></v-text-field>

    <v-text-field
      :value="mappingTown"
      label="城市"
      disabled
    ></v-text-field>

    <v-text-field
      :value="mappingSection"
      label="路段"
      disabled
    ></v-text-field>

    <v-text-field
      :value="createdAt"
      label="建立時間"
      disabled
    ></v-text-field>
  
    <v-text-field
      :value="updatedAt"
      label="更新時間"
      disabled
    ></v-text-field>
    
    <v-text-field
      :value="section.executedAt"
      label="執行時間"
      disabled
    ></v-text-field>
    
    <v-text-field
      :value="section.landBuildMax"
      :rules="numberOnlyRule"
      label="最大路段"
    ></v-text-field>
    
    <v-btn
      :disabled="!valid"
      color="success"
    >
      Validate
    </v-btn>
  </v-form>
</div>
</template>

<script>
import axios from 'axios'
import dateUtil from '../../lib/date'

export default {
  async asyncData ({ params, req }) {
    const {cityCode = '', townCode = '', sectCode = ''} = req.query

    const requestOptions = {
      params: {cityCode, townCode, sectCode}
    }  

    const {cityConfig, townConfig, sectConfig} = (await axios.get(`http://${req.connection.remoteAddress}:3000/api/system`)).data

    const response = await axios.get(`http://${req.connection.remoteAddress}:3000/api/section`, requestOptions)
    const section = response.data || {}

    return {cityCode, townCode, sectCode, section, cityConfig, townConfig, sectConfig}
  },
  methods: {
  },
  computed: {
    mappingSection: function(){
      const {sectCode = '', sectConfig = []} = this
      const result = sectConfig.find( item => item.code === sectCode) || {}
      return result.title || '...'
    },
    mappingTown: function(){
      const {townCode = '', townConfig = []} = this
      const result = townConfig.find( item => item.code === townCode) || {}
      return result.title || '...'
    },
    mappingCity: function(){
      const {cityCode = '', cityConfig = []} = this
      const result = cityConfig.find( item => item.code === cityCode) || {}
      return result.title || '...'
    },
    createdAt: function(){
      const {section = {}} = this
      const {createdAt} = section

      return dateUtil.format(createdAt)
    },
    updatedAt: function(){
      const {section = {}} = this
      const {updatedAt} = section
      return dateUtil.format(updatedAt)
    }
  },
  data: function(){
    return {
      valid: false,
      numberOnlyRule: [
          v => !!v || 'Number is required',
          v => !isNaN(v) || 'It is not a number'
        ]
      }
    }
}
</script>

<style scoped>

</style>