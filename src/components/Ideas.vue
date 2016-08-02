<template>
  <div class='container'>
    Title: <br><input v-model="title" v-on:keyup.enter="addidea">
    <br><br>
    Body: <br><input v-model="body" v-on:keyup.enter="addidea">
    <div v-for="idea in ideas">
      <h3>{{ idea.title }}</h3>
      <h3>{{ idea.body }}</h3>
      <h3>{{ idea.quality }}</h3>
      <button v-on:click="removeidea($index)">Remove idea</button>
    </div>
  </div>
</template>

<script>
  import Lspi from 'lspi'

  const lspi = new Lspi()

  const ready = () => {
    if (!lspi.getRecord('ideas')) {
      lspi.setRecord('ideas', [])
      return []
    } else {
      return lspi.getRecord('ideas')
    }
  }

  export default {
    data () {
      return {
        ideas: ready(),
        title: '',
        body: ''
      }
    },
    methods: {
      addidea () {
        const title = this.title.trim()
        const body = this.body.trim()
        if (title && body) {
          this.ideas.push({ title: title, body: body })
          lspi.setRecord('ideas', this.ideas)
          this.newidea = ''
        }
      },
      removeidea (index) {
        this.ideas.splice(index, 1)
        lspi.setRecord('ideas', this.ideas)
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: #42b983;
  }

  .container {
    position: center;
  }
</style>
