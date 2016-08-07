import Lspi from 'lspi'

class IdeasHelper {
  constructor () {
    this.lspi = new Lspi()
    this.qualityUp = {
      Swill: 'Plausible',
      Plausible: 'Genius',
      Genius: 'Genius'
    }
    this.qualityDown = {
      Swill: 'Swill',
      Plausible: 'Swill',
      Genius: 'Plausible'
    }
    this.sortGenius = true
  }

  initIdeas () {
    if (!this.lspi.getRecord('ideas')) {
      this.lspi.setRecord('ideas', [])
      return []
    } else {
      return this.lspi.getRecord('ideas')
    }
  }
}

module.exports = new IdeasHelper()
