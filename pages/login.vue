<template>
  <v-layout>
    <v-flex text-xs-center>
      <form action="/api/auth" method='POST'>
        <v-text-field
          v-model="email"
          name="email"
          :counter="10"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          name="password"
          label="Password"
          required
        ></v-text-field>

        <v-btn type="submit" >submit</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>



<script>
  export default {
    data: () => ({
      password: '',
      email: '',
    }),

    mounted () {
    },

    methods: {
    }
  }
</script>

<style scoped>
form {
  max-width: 600px;
  width: 80%;
  margin: auto;
  margin-top: 100px;
}
</style>