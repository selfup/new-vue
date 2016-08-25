<script>
  import IdeasHelper from './../component-helpers/idea-helper'

  export default {
    data () {
      return {
        helper: IdeasHelper,
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
          this.helper.lspi.setRecord('ideas', this.ideas)
          this.clearInput()
        }
      },

      createIdea (title, body) {
        this.ideas.unshift({
          title: title,
          body: body,
          quality: 'Swill'
        })
      },

      removeidea (index) {
        this.ideas.splice(index, 1)
        this.helper.lspi.setRecord('ideas', this.ideas)
      },

      clearInput () {
        this.title = ''
        this.body = ''
      },

      clearallideas () {
        this.ideas = []
        this.helper.lspi.setRecord('ideas', [])
      },

      qualitydown (index) {
        let currentIdea = this.ideas[index]
        currentIdea.quality = this.helper.qualityDown[currentIdea.quality]
        this.helper.lspi.setRecord('ideas', this.ideas)
      },

      qualityup (index) {
        let currentIdea = this.ideas[index]
        currentIdea.quality = this.helper.qualityUp[currentIdea.quality]
        this.helper.lspi.setRecord('ideas', this.ideas)
      },

      sortGeniusTop () {
        this.helper.sortGenius = false
        this.ideas.sort((a, b) => { return a.quality > b.quality ? 1 : -1 })
      },

      sortSwillTop () {
        this.helper.sortGenius = true
        this.ideas.sort((a, b) => { return a.quality < b.quality ? 1 : -1 })
      },

      sortbyquality () {
        if (this.helper.sortGenius) return this.sortGeniusTop()
        this.sortSwillTop()
      },

      search () {
        if (this.searchTerm === '') return this.reload()
        this.matches(this.searchSegments([]))
      },

      reload () {
        this.searched = false
        this.ideas = this.helper.initIdeas()
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
        this.helper.lspi.setRecord('ideas', this.ideas)
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
            class="btn btn-primary btn-sm"
            v-on:click="sortbyquality"
          >
          Sort By Quality
          </button>
          <button
            class="btn btn-warning btn-sm"
            v-on:click="clearallideas"
          >
          Clear All Ideas
          </button>
          <h4>Search</h4>
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
      <h4>Title</h4>
      <input
        class="form-control"
        v-model="title"
        v-on:keyup.enter="addidea"
      >
      <h4>Body</h4>
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
        <br>
        <span
            class="glyphicon glyphicon-chevron-up up topleft"
            v-on:click="qualityup($index)"
          >
        </span>
          <span
            class="glyphicon glyphicon-chevron-down down topleftdown"
            v-on:click="qualitydown($index)"
          >
        </span>
        <span
          class="glyphicon glyphicon-remove topright"
          v-on:click="removeidea($index)"
        >
        </span>
        <br>
        <h4
          class="idea-title"
          v-on:keydown.enter="updateidea($event, $index)"
          v-on:blur="updateidea($event, $index)"
          contenteditable="true"
        >
        {{ idea.title }}
        </h4>
        <h5
          class="idea-body"
          v-on:keydown.enter="updateidea($event, $index)"
          v-on:blur="updateidea($event, $index)"
          contenteditable="true"
        >
        {{ idea.body }}
        </h5>
        <hr>
        <span><em>{{ idea.quality }}</em></span><br>
        <br>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  button {
    border-radius: 25px;
    margin: 10px;
  }

  .btn {
    border-radius: 0px;
  }

  input {
    border-radius: 0px;
  }

  hr {
    width: 100%;
    border-color: grey;
  }

  .idea-container {
    position: relative;
    background-color: #F2F4FF;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 90%;
  }

  .idea-container h4, h5 {
    padding: 5px 0;
  }

  .input-container {
    background-color: #96C5F7;
    margin-bottom: 5px;
    margin-top: 5px;
    width: 90%;
  }

  .sort-search-container {
    background-color: #93ACB5;
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

  .topright {
    float: right;
    right: 16px;
    font-size: 18px;
    padding-left: 17px;
  }

  .topleftdown {
    float: left;
    left: 50px;
    font-size: 18px;
  }

  .topleft {
    float: left;
    left: 16px;
    font-size: 18px;
  }
</style>
