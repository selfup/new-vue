<script>
  import Lspi from 'lspi'

  const lspi = new Lspi()

  const initIdeas = () => {
    if (!lspi.getRecord('ideas')) {
      lspi.setRecord('ideas', [])
      return []
    } else {
      return lspi.getRecord('ideas')
    }
  }

  const qualityUp = {
    Swill: 'Plausible',
    Plausible: 'Genius',
    Genius: 'Genius'
  }

  const qualityDown = {
    Swill: 'Swill',
    Plausible: 'Swill',
    Genius: 'Plausible'
  }

  let sortGenius = true

  export default {
    data () {
      return {
        ideas: initIdeas(),
        title: '',
        body: '',
        quality: '',
        searchTerm: ''
      }
    },
    methods: {
      addidea () {
        const title = this.title.trim()
        const body = this.body.trim()
        if (title && body) {
          this.ideas.unshift({ title: title, body: body, quality: 'Swill' })
          lspi.setRecord('ideas', this.ideas)
          this.clearInput()
        }
      },
      removeidea (index) {
        this.ideas.splice(index, 1)
        lspi.setRecord('ideas', this.ideas)
      },
      clearInput () {
        this.title = ''
        this.body = ''
      },
      qualitydown (index) {
        let currentIdea = this.ideas[index]
        currentIdea.quality = qualityDown[currentIdea.quality]
        lspi.setRecord('ideas', this.ideas)
      },
      qualityup (index) {
        let currentIdea = this.ideas[index]
        currentIdea.quality = qualityUp[currentIdea.quality]
        lspi.setRecord('ideas', this.ideas)
      },
      sortGeniusTop () {
        this.ideas.sort((a, b) => { return a.quality > b.quality })
      },
      sortSwillTop () {
        this.ideas.sort((a, b) => { return a.quality < b.quality })
      },
      sortbyquality () {
        if (sortGenius) {
          this.sortGeniusTop()
          sortGenius = false
        } else {
          this.sortSwillTop()
          sortGenius = true
        }
      },
      search () {
        let matchedIdeas = []
        if (this.searchTerm === '') {
          this.ideas = initIdeas()
          this.searched = false
          return
        }
        this.searched = true
        matchedIdeas = this.searchSegments(matchedIdeas)
        if (matchedIdeas[0] !== undefined) this.ideas = matchedIdeas
      },
      searchSegments (matchedIdeas) {
        const searchTerm = this.searchTerm.toLowerCase()
        this.ideas.forEach(idea => {
          const t = idea.title.toLowerCase().includes(searchTerm)
          const b = idea.body.toLowerCase().includes(searchTerm)
          if (t || b) {
            matchedIdeas.push(idea)
          }
        })
        return matchedIdeas
      }
    }
  }
</script>

<template>
  <div class="container">
    <div class="input-container container">
      <div class="sort-search-container container">
        <div v-if="ideas.length > 1 || searched">
          <button
            class="btn btn-primary" 
            v-on:click="sortbyquality"
          >
          Sort By Quality
          </button>
          <h3>Search</h3>
          <input 
            class="form-control" 
            v-model="searchTerm" 
            v-on:keyup="search"
          >
        </div>
        <div v-else><h2>Add a new Idea<h2></div>
        <br>
      </div>
      <h3>Title:</h3>
      
      <input 
        class="form-control" 
        v-model="title" 
        v-on:keyup.enter="addidea"
      >

      <h3>Body:</h3> 

      <input 
        class="form-control" 
        v-model="body" 
        v-on:keyup.enter="addidea"
      >
      <button 
        class="btn btn-success" 
        v-on:click="addidea"
      >
      Submit
      </button>
    </div>

    <div v-for="idea in ideas">
      <div class="idea-container container">
        <h4>Title:</h4>
        <h5>{{ idea.title }}</h5>
        <h4>Body:</h4>
        <h5>{{ idea.body }}</h5>
        <h4>
          Quality
          <span 
            class="glyphicon glyphicon-chevron-up up" 
            v-on:click="qualityup($index)"
          >
          </span>
          <span 
            class="glyphicon glyphicon-chevron-down down"
            v-on:click="qualitydown($index)"
          >
          </span>
        </h4>
        <h5><em>{{ idea.quality }}</em></h5>
        <button 
          class="btn btn-danger" 
          v-on:click="removeidea($index)"
        >
        Remove idea
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  button {
    border-radius: 0px;
    margin: 10px;
  }

  input {
    border-radius: 0px;
  }

  .idea-container {
    background-color: #c6c4c4;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 70%;
    box-shadow: 2px 2px 5px grey;
  }

  .input-container {
    background-color: #fca664;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 90%;
    box-shadow: 2px 2px 5px grey;
  }

  .sort-search-container {
    background-color: #438fb2;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 90%;
    box-shadow: 2px 2px 5px grey;
    position: center;
  }

  .up {
    color: #5CB85C;
  }

  .down {
    color: #C9302C;
  }
</style>
