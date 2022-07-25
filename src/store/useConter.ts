import { defineStore } from 'pinia';
import { gateway } from '../api/index';

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    moviesList: {},
  }),
  getters: {
    getResult: (state) => {
      return state.moviesList;
    },
  },
  actions: {
    async fetchTopRatedMovies(): Promise<void> {
      try {
        const res = await gateway('GET', 'movie/top_rated');
        this.moviesList = res;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
