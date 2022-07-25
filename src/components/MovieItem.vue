<template>
  <div class="card">
    <el-card :body-style="{ padding: '0px' }" @click="selectItem(movie.id)">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="image" />
      <div class="tw-p-4 tw-flex tw-flex-col card-text">
        <el-progress
          :text-inside="true"
          :stroke-width="22"
          :percentage="ratePercent"
          :status="rateStatus"
          class="tw-mb-2"
        />
        <span class="tw-font-medium">
          {{ movie.title }}
        </span>
        <span class="tw-font-light">
          {{ movie.release_date }}
        </span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { computed, type ComputedRef } from 'vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Movie Item',
    props: {
      movie: {
        type: Object,
        default: () => {},
      },
    },
    setup(props, { emit }) {
      const ratePercent: ComputedRef<number> = computed((): number => {
        return props.movie.vote_average * 10;
      });
      const rateStatus: ComputedRef<string> = computed((): string => {
        if (props.movie.vote_average < 8) {
          return 'warning';
        } else if (props.movie.vote_average < 6) {
          return 'exception';
        }
        return 'success';
      });

      const selectItem = (id: number): void => {
        emit('selectItem', id)
      }

      return {
        ratePercent,
        rateStatus,
        selectItem
      };
    },
  });
</script>
