<script>
  import Ideas from './components/Ideas'

  export default {
    components: {
      Ideas
    }
  }
</script>

<template>
  <div id="app" class="container">
    <h2>Idea Box in Vue.js!</h2>
    <ideas></ideas>
  </div>
</template>

<style>
  body {
    background: #827784;
  }

  #app {
    color: #2c3e50;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }
</style>
