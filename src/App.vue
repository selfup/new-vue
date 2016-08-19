<script>
  import Ideas from './components/Ideas'

  const registerServiceWorker = () => {
    const httpsCheck = window.location.href.split('')[4]
    const lh         = 'localhost:8080'

    if ( httpsCheck !== 's' && !window.location.href.includes(lh)) return
    if (!navigator.serviceWorker)                                  return

    navigator
      .serviceWorker
        .register('/static/service-worker.js')
          .then(reg => {
            console.log("Service worker registered")
              reg
                .update()
                  .then(reg => {
                    console.log("Cached Assets UPDATED")
                  })
          })
  }

  registerServiceWorker()

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
    background-color: #3C6997;
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

  /* Responsive Styling */
  @media (max-width: 1199px) {
    .container p {
      font-size: 46px;
    }
  }

  @media (max-width: 1199px) {
    .container p {
      font-size: 46px;
    }
  }

  @media (max-width: 991px) {
    .container h1 {
      font-size: 36px;
    }
  }

  @media (max-width: 767px) {
    .container h1 {
      font-size: 26px;
    }
  }

  @media (max-width: 467px) {
    .container h1 {
      font-size: 26px;
    }
  }

  @media (max-width: 467px) {
    .container p {
      font-size: 16px;
    }
  }

  @media (max-width: 367px) {
    .container {
      background-position: center;
    }
  }
</style>
