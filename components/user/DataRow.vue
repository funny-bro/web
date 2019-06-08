<template>
  <div class='dataRow' v-if='item'>
    <span class='username'> {{username}}</span>
    <span class='password'> 
      <v-text-field
        class='passwordInput'
        v-model='password'
        @keyup.native.enter="onKeyupEnterHandler"
      ></v-text-field>
    </span>
    <span class='status'> {{status}} / {{statusNat}}</span>
    <span class='updatedAt'> {{dateFormat(createdAt)}}</span>
    <span class='updatedAt'> {{dateFormat(updatedAt)}}</span>
    <span class='switch'>
      <v-select
        :items="['on', 'off']"
        label="開關"
        v-model="disable"
        solo
      />
    </span>
    <v-progress-circular
      v-if='isLoading'
      indeterminate
      color="deep-orange lighten-2"
    ></v-progress-circular>
  </div>
</template>

<script>
import axios from 'axios'
import dateUtil from '../../lib/date'

export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  data: function(){
    return {
      ...this.item,
      disable: this.item.disable? 'on' : 'off',
      isLoading: false
    }
  },
  methods: {
    dateFormat: function(dateObject){
      return dateUtil.format(dateObject)
    },
    onKeyupEnterHandler: async function(data, e){
      const {id} = this.item
      const {password} = this
      this.isLoading = true

      const res = await axios.post(`/api/user/${id}`, {password})

      this.notificationMsg = `更新成功`
      this.snackbar = true
      this.isLoading = false
    }
  },
  watch: {
    disable: async function() {
      const {id} = this.item
      const {disable} = this
      this.isLoading = true

      const _disable = (disable === 'on')? true : false
      const res = await axios.post(`/api/user/${id}`, {disable: _disable})

      this.notificationMsg = `更新成功`
      this.snackbar = true
      this.isLoading = false
    },
    password: function () {
      console.log('-=-=-= onchange: ', this.password)

    }
  }
}
</script>

<style scoped>
.dataRow {
  margin: 20px 0;
  font-size: 20px;
  display: flex;
}
.dataRow span {
  padding: 0 20px;
  display: block;
  width: 150px;
  color: gray;
}
.dataRow .username,  .dataRow .password{
  color: white;
}

.dataRow .status{
  
}
.passwordInput {
  margin-top: -10px;
}
</style>
