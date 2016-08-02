<template>
  <div id="app">
    <h2>Welcome to my first Vue App!</h2>
    <div>
      <ideas></ideas>
    <div>
  </div>
</template>

<script>
  import Ideas from './components/Ideas'

  export default {
    components: {
      Ideas
    }
  }
</script>

<style>
  html, body {margin:0;padding:0}

  body {
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  #app {
    color: #2c3e50;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }
</style>
