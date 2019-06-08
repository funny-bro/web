<template>
  <v-layout row wrap>
    <v-flex xs12 lg6>
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
        class='datePickerContainer'
      >
        <v-text-field
          slot="activator"
          v-model="dateFormatted"
          :name='name'
          :label='title'
          hint="YYYY-MM-DD format"
          persistent-hint
          prepend-icon="event"
          @blur="date = parseDate(dateFormatted)"
        ></v-text-field>
        <v-date-picker v-model="date" no-title @input="menu1 = false" color="green lighten-1" :name='name'/>
      </v-menu>
      <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p> -->
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    dayBefore: {
      type: Number,
      default: 0
    }
  },
  data: function(){
    const {dayBefore = 0} = this
    const nDaysAgo = new Date()
    nDaysAgo.setDate(nDaysAgo.getDate()-dayBefore);
    return {
      date: nDaysAgo.toISOString().substr(0, 10),
      dateFormatted: this.formatDate(nDaysAgo.toISOString().substr(0, 10)),
      menu1: false,
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}-${day}-${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('-')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
.datePickerContainer {
  margin-left: auto;
  width: 30%;
  min-width: 200px;
}
</style>