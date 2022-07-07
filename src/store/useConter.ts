import { defineStore } from 'pinia'

export const useCounterStore = defineStore("main", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    dubbleCount: (state) => {
      return state.counter*2
    }
  },
  actions: {
    reset() {
      this.counter = 0
    },
    addOne() {
      console.log(this.counter)
      this.counter++
    }
  },
})