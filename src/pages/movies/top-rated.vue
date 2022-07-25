<template>
  <div class="tw-flex tw-px-10 tw-mt-10">
    <div class="sort-container">
      <h1 class="tw-text-2xl tw-mb-2">Popular Movies</h1>
      <div class="tw-flex tw-flex-col">
        <el-menu default-active="2" @open="handleOpen" @close="handleClose">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span class="tw-text-lg">Filters</span>
            </template>
            <el-menu-item-group title="Genres">
              <el-menu-item index="1-1" class="tw-flex tw-flex-wrap tw-my-2">
                <el-check-tag
                  class="tw-m-1"
                  v-for="genre in genresList"
                  v-model="genre.isChecked"
                  :key="genre.id"
                  :checked="genre.isChecked"
                  @change="onChange(genre.id)"
                >
                  {{ genre.name }}
                </el-check-tag>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="User Score">
              <el-menu-item index="1-2">
                <el-slider v-model="userScore" range show-stops :max="10" />
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
        <button class="tw-bg-primary tw-mt-2 tw-text-white tw-h-10 tw-rounded" @click="search">Search</button>
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap tw-justify-between" v-infinite-scroll="load">
      <MovieItem v-for="movie in moviesList.results" :key="movie.id" :movie="movie" @selectItem="selectItem" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { fetchPopularFilms, fetchGanres } from '@/api/films';
  import MovieItem from '@/components/MovieItem.vue';
  import type { MoviesResult } from '@/types/movies';
  import type { GenresItem } from '@/types/genres';
  import { useRouter } from 'vue-router';
  import type { Ref } from 'vue';

  export default defineComponent({
    components: { MovieItem },
    async setup() {
      const router = useRouter();

      const userScore: Ref<number[]> = ref([0, 10]);
      const moviePage: Ref<number> = ref(1);
      let moviesList: Ref<MoviesResult> = ref({} as MoviesResult);

      onMounted(async (): Promise<void> => {
        const res: MoviesResult = await fetchPopularFilms({ page: moviePage.value });
        moviesList.value = res;
      });

      const load = async (): Promise<void> => {
        moviePage.value++;
        const res = await fetchPopularFilms({
          page: moviePage.value,
          with_genres: genresIds.toString(),
          'vote_average.gte': userScore.value[0],
          'vote_average.lte': userScore.value[1],
        });
        moviesList.value.results.push(...res.results);
      };

      const handleOpen = (key: string, keyPath: string[]): void => {
        console.log(key, keyPath);
      };
      const handleClose = (key: string, keyPath: string[]): void => {
        console.log(key, keyPath);
      };

      let genresList: Ref<GenresItem[]> = ref([] as GenresItem[]);
      const genresIds: Ref<number[]> = ref([]);

      const resGenres = await fetchGanres();

      genresList.value = [...resGenres.genres].map((i: GenresItem): GenresItem => {
        return { isChecked: false, ...i };
      });

      const onChange = (id: number): void => {
        genresList.value.map((i: GenresItem): void => {
          if (i.id === id) {
            if (i.isChecked) {
              genresIds.value.splice(genresIds.value.indexOf(id), 1);
            } else {
              genresIds.value.push(id);
            }
            i.isChecked = !i.isChecked;
          }
        });
      };
      const search = async (): Promise<void> => {
        moviePage.value = 1;
        const res: MoviesResult = await fetchPopularFilms({
          page: moviePage.value,
          with_genres: genresIds.toString(),
          'vote_average.gte': userScore.value[0],
          'vote_average.lte': userScore.value[1],
        });
        moviesList.value = res;
      };

      const selectItem = (id: number): void => {
        router.push({ name: 'Movie', params: { id } });
      };

      return {
        moviesList,
        genresList,
        userScore,
        load,
        handleOpen,
        handleClose,
        onChange,
        search,
        selectItem,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .el-sub-menu .el-menu-item {
    height: 100%;
  }
</style>
