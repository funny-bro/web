<template>
<div>
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
      :value="section.executedAt || '--'"
      label="執行時間"
      disabled
    ></v-text-field>
    
    <v-text-field
      :value="section.landBuildMax || '--'"
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
  props: {
    cityCode: {
      type: String,
      default: ''
    },
    townCode: {
      type: String,
      default: ''
    },
    sectCode: {
      type: String,
      default: ''
    },
    cityConfig: {
      type: Array,
      default: () => []
    },
    townConfig: {
      type: Array,
      default: ()=> []
    },
    sectConfig: {
      type: Array,
      default: () => []
    },
    section: {
      type: Object,
      default: () => ({
        executedAt: '',
        landBuildMax: ''
      })
    }
  },
  methods: {
  },
  computed: {
    mappingSection: function(){
      const {section, sectConfig = []} = this
      const {sectCode = ''} = section
      const result = sectConfig.find( item => item.code === sectCode) || {}
      return result.title || '...'
    },
    mappingTown: function(){
      const {section, townConfig = []} = this
      const {townCode = ''} = section
      const result = townConfig.find( item => item.code === townCode) || {}
      return result.title || '...'
    },
    mappingCity: function(){
      const {section, cityConfig = []} = this
      const {cityCode = ''} = section
      const result = cityConfig.find( item => item.code === cityCode) || {}
      return result.title || '...'
    },
    createdAt: function(){
      const {section = {}} = this
      const {createdAt} = section
      
      return createdAt? dateUtil.format(createdAt) : '--'
    },
    updatedAt: function(){
      const {section = {}} = this
      const {updatedAt} = section

      return updatedAt? dateUtil.format(updatedAt) : '--'
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