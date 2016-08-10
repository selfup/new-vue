<script>
  import IdeasHelper from './../component-helpers/idea-helper'

  export default {
    data () {
      return {
        ideas: IdeasHelper.initIdeas(),
        title: '',
        body: '',
        searchTerm: ''
      }
    },

    methods: {
      addidea () {
        const title = this.title.trim()
        const body = this.body.trim()
        if (title && body) {
          this.createIdea(title, body)
          IdeasHelper.lspi.setRecord('ideas', this.ideas)
          this.clearInput()
        }
      },

      createIdea (title, body) {
        this.ideas.unshift({
          title: title,
          body: body,
          quality: 'Swill',
          edit: false
        })
      },

      removeidea (index) {
        this.ideas.splice(index, 1)
        IdeasHelper.lspi.setRecord('ideas', this.ideas)
      },

      clearInput () {
        this.title = ''
        this.body = ''
      },

      clearallideas () {
        this.ideas = []
        IdeasHelper.lspi.setRecord('ideas', [])
      },

      qualitydown (index) {
        let currentIdea = this.ideas[index]
        currentIdea.quality = IdeasHelper.qualityDown[currentIdea.quality]
        IdeasHelper.lspi.setRecord('ideas', this.ideas)
      },

      qualityup (index) {
        let currentIdea = this.ideas[index]
        currentIdea.quality = IdeasHelper.qualityUp[currentIdea.quality]
        IdeasHelper.lspi.setRecord('ideas', this.ideas)
      },

      sortGeniusTop () {
        IdeasHelper.sortGenius = false
        this.ideas.sort((a, b) => { return a.quality > b.quality })
      },

      sortSwillTop () {
        IdeasHelper.sortGenius = true
        this.ideas.sort((a, b) => { return a.quality < b.quality })
      },

      sortbyquality () {
        if (IdeasHelper.sortGenius) return this.sortGeniusTop()
        this.sortSwillTop()
      },

      search () {
        if (this.searchTerm === '') return this.reload()
        this.matches(this.searchSegments([]))
      },

      reload () {
        this.searched = false
        this.ideas = IdeasHelper.initIdeas()
      },

      matches (matchedIdeas) {
        this.searched = true
        if (matchedIdeas[0] !== undefined) this.ideas = matchedIdeas
      },

      searchSegments (matchedIdeas) {
        const searchTerm = this.searchTerm.toLowerCase()
        this.ideas.forEach(idea => {
          const title = idea.title.toLowerCase().includes(searchTerm)
          const body = idea.body.toLowerCase().includes(searchTerm)
          if (title || body) matchedIdeas.push(idea)
        })
        return matchedIdeas
      },

      updateidea (e, i) {
        e.preventDefault()
        const newText = e.target.textContent.trim()
        if (e.target.className === 'idea-title') this.ideas[i].title = newText
        if (e.target.className === 'idea-body') this.ideas[i].body = newText
        this.ideas[i].edit = false
        IdeasHelper.lspi.setRecord('ideas', this.ideas)
      },

      editidea (index) {
        this.ideas[index].edit = true
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
          <button
            class="btn btn-warning"
            v-on:click="clearallideas"
          >
          Clear All Ideas
          </button>
          <h3>Search</h3>
          <input
            class="form-control"
            v-model="searchTerm"
            v-on:keyup="search"
          >
        </div>
        <div v-else>
          <h2>Idea Box in Vue.js!</h2>
        </div>
        <br>
      </div>
      <h3>Title</h3>
      <input
        class="form-control"
        v-model="title"
        v-on:keyup.enter="addidea"
      >
      <h3>Body</h3>
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
        <h4>Title</h4>
        <h5
          class="idea-title"
          v-on:click="editidea($index)"
          v-on:keydown.enter="updateidea($event, $index)"
          contenteditable="{{idea.edit}}"
        >
        {{ idea.title }}
        </h5>
        <h4>Body</h4>
        <h5
          class="idea-body"
          v-on:click="editidea($index)"
          v-on:keydown.enter="updateidea($event, $index)"
          contenteditable="{{idea.edit}}"
        >
        {{ idea.body }}
        </h5>
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
    background-color: #fff8d6;
  }

  .idea-container {
    background-color: #c6c4c4;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 90%;
    box-shadow: 2px 2px 5px grey;
  }

  .input-container {
    background-color: #fca664;
    margin-bottom: 5px;
    width: 90%;
    box-shadow: 2px 2px 5px grey;
  }

  .sort-search-container {
    background-color: grey;
    margin-bottom: 5px;
    margin-top: 10px;
    width: 90%;
    position: center;
  }

  .up {
    color: #5CB85C;
  }

  .down {
    color: #C9302C;
  }
</style>
