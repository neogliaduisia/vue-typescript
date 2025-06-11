<template>
  <div v-if="!isLoading" class="tw-px-10 tw-pt-10 tw-flex">
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      class="image tw-rounded-xl tw-mr-6"
      width="350"
      alt="poster"
    />
    <div class="tw-flex tw-flex-col tw-self-center">
      <div>
        <h1 class="tw-text-3xl tw-font-bold">
          {{ movie.title }}
        </h1>
        <div class="tw-text-lg">
          {{ movie.release_date }}
          /
          {{ movieGanres }}
          /
          {{ movieRuntime(movie.runtime) }}
        </div>
      </div>
      <div class="tw-my-3 tw-flex tw-items-center">
        <el-progress type="circle" :percentage="ratePercent" :color="rateColor" width="64" />
        <h3 class="tw-ml-4 tw-text-lg">User Score</h3>
      </div>
      <div class="tw-mb-3">
        <h2 class="tw-text-2xl tw-font-semibold">Overview</h2>
        <h3 class="tw-text-lg">
          {{ movie.overview || '-' }}
        </h3>
      </div>
      <div class="tw-mb-3">
        <h2 class="tw-text-2xl tw-font-semibold">Budget</h2>
        <h3 class="tw-text-lg">{{ movie.budget.toLocaleString() }}$</h3>
      </div>
      <div>
        <h2 class="tw-text-2xl tw-font-semibold">Revenue</h2>
        <h3 class="tw-text-lg">{{ movie.revenue.toLocaleString() }}$</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, onMounted } from 'vue';
  import MovieItem from '@/components/MovieItem.vue';
  import type { MovieResultItem } from '@/types/movies';
  import type { GenresItem } from '@/types/genres';
  import { fetchMovie } from '@/api/films';
  import { useRoute } from 'vue-router';
  import type { Ref, ComputedRef } from 'vue';

  export default defineComponent({
    components: { MovieItem },
    setup() {
      const route = useRoute();
      const movie: Ref<MovieResultItem> = ref({} as MovieResultItem);
      const isLoading: Ref<boolean> = ref(true);

      onMounted(async (): Promise<void> => {
        isLoading.value = true;
        const res: MovieResultItem = await fetchMovie(route.params.id as string);
        movie.value = res;
        isLoading.value = false;
      });

      const ratePercent: ComputedRef<number> = computed((): number => {
        return Math.round(movie.value.vote_average * 10);
      });
      const movieGanres: ComputedRef<string> = computed((): string => {
        return movie.value.genres.map((i: GenresItem) => i.name).join(', ');
      });
      const rateColor: ComputedRef<string> = computed((): string => {
        if (movie.value.vote_average < 8) {
          return 'orange';
        } else if (movie.value.vote_average < 6) {
          return 'red';
        }
        return 'green';
      });

      watch(
        () => route.params.id,
        async (newId): Promise<void> => {
          console.log(newId);
          const res = await fetchMovie(newId as string);
          movie.value = res;
        }
      );

      const movieRuntime = (time: number): string => {
        const hours = time / 60;
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return `${rhours}h ${rminutes}m`;
      };

      return { movie, isLoading, ratePercent, rateColor, movieRuntime, movieGanres };
    },
  });
</script>
