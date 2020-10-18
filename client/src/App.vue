<template>
  <div id="app">
    <CardComponent />
  </div>
</template>

<script>
// Import Bootstrap Vue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import CardComponent from './components/CardComponent.vue'

export default {
  name: 'App',
  components: {
    CardComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
