import Vue from 'vue'
import Ideas from 'src/components/Ideas'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><ideas></ideas></div>',
      components: { Ideas }
    }).$mount()
    expect(vm.$el.querySelector('h2').textContent).to.contain('Idea Box in Vue.js!')
  })
})
