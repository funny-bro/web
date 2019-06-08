<template>
  <div class='rowContainer'>
    <div class='selectionContainer'>
      <h1>帳號管理</h1>
    </div>
    <div class='contentContainer'>
      <div class='dataRow'>
        <span class='username'> 帳號 </span>
        <span class='password'> 密碼 </span>
        <span class='status'> 狀態(光特/群琁) </span>
        <span class='updatedAt'> 建立時間</span>
        <span class='updatedAt'> 更新時間</span>
        <span> </span>
      </div>

      <div v-for='(item, index) in userList' :key='index' class='dataRow'>
        <DataRow :item='item'/>
      </div>


      <!-- <div v-for='(item, index) in userList' :key='index' class='dataRow'>
        <DataRow />
        <span class='username'> {{item.username}}</span>
        <span class='password'> {{item.password}}</span>
        <span class='status'> {{item.status}} / {{item.statusNat}}</span>
        <span class='updatedAt'> {{dateFormat(item.createdAt)}}</span>
        <span class='updatedAt'> {{dateFormat(item.updatedAt)}}</span>
        <span class='switch'>
          <v-select
            :items="['on', 'off']"
            label="開關"
            solo
          />
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dateUtil from '../../lib/date'
import DataRow from '@/components/user/DataRow'

export default {
  components: { DataRow },
  async asyncData ({ params, req }) {
    const {count, data} = (await axios.get(`http://0.0.0.0:${req.connection.localPort}/api/user`)).data
    return {
      count,
      userList: data
    }
  },
  methods: {
  },
  computed: {
  },
  data: function(){
    const innerUserList = this.userList
    return {
      isLoading: true,
      innerUserList
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.rowContainer{
  width: 80vw;
  margin: auto;
}
.selectionContainer {
}
.contentContainer {
  margin-top: 50px;
}
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
</style>