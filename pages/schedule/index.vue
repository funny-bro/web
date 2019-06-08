<template>
  <div>
    schedule
    <div>
      <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
        <div v-for="element in myArray" :key="element.id" class='dragItem'>
          <v-text-field
            class='passwordInput'
            v-model='element.name'
            @keyup.native.enter="onKeyupEnterHandler"
          ></v-text-field>
        </div>
      </draggable>
    </div>
    <div>
      <v-btn color="info">更新</v-btn>
    </div>
  </div>
</template>


<script>
import draggable from 'vuedraggable'

export default {
  components: {
      draggable,
  },
  data: function(){
    const myArray = [
      { name: 'peter1', id: 'peter1Id'},
      { name: 'peter2', id: 'peter2Id'},
      { name: 'peter3', id: 'peter3Id'},
      { name: 'peter', id: 'peterId'}
    ]
    return {myArray}
  },
  methods: {
  }
}
</script>

<style scoped>
.dragItem {
  color: black;
  background-color: gray;
  padding: 10px 30px;
  font-size: 16px;
  cursor: grab;
  margin: 10px 0;
}
</style>
