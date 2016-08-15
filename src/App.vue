<script>
  import Ideas from './components/Ideas'

  const registerServiceWorker = () => {
    if (!navigator.serviceWoker) return console.log("no service worker")
    navigator
      .serviceWorker
        .register('/static/service-worker.js').then(reg => {
          console.log("Service worker registered")
            reg.update().then(reg => {
              console.log("Cached Assets UPDATED");
            });
        })
  };

  registerServiceWorker();

  export default {
    components: {
      Ideas
    }
  }
</script>

<template>
  <div id="app" class="container">
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
