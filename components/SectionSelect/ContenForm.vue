<template>
<div>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ notificationMsg }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

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
      v-model='innerLandBuildMax'
      :rules="numberOnlyRule"
      label="最大建號"
    ></v-text-field>
    
    <v-btn
      :disabled="!valid"
      color="success"
      @click='handleSubmit'
    >
      更新
    </v-btn>
    <v-progress-circular
      v-if='isLoading'
      indeterminate
      color="deep-orange lighten-2"
    ></v-progress-circular>
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
    handleSubmit: async function(){
      try{
        this.isLoading = true
        const {innerLandBuildMax : landBuildMax, section} = this
        const {id} = section
        
        if(!id || !landBuildMax) return 

        const res = await await axios.post('/api/section', {id, landBuildMax}, )
        this.notificationMsg = `更新成功`
        this.snackbar = true
        this.isLoading = false
      }
      catch(err){
        this.notificationMsg = `更新失敗`
        this.snackbar = true
        this.isLoading = false
      }
    }
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
      notificationMsg: '',
      isLoading: false,
      snackbar: false,
      innerLandBuildMax: this.section.landBuildMax || '--',
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