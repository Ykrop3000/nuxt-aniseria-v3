import Vue from 'vue'

Vue.directive('infinite-scroll', {
  bind  (el, binding, vnode) {
    el.infiniteScrollEvent = function (event) {
      if (window.pageYOffset + window.innerHeight >= el.offsetHeight) {
        vnode.context[binding.expression](event)
      }
    }

    document.addEventListener('scroll', el.infiniteScrollEvent)
  },
  unbind (el) {
    document.removeEventListener('scroll', el.infiniteScrollEvent)
  }
})
