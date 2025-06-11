<template>
  <el-menu
    :default-active="activeIndex"
    background-color="#032541"
    text-color="#fff"
    class="tw-mx-10 tw-my-2"
    mode="horizontal"
    :ellipsis="false"
  >
    <div class="tw-px-10 tw-flex">
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
        width="180"
        alt="header-img"
      />
    </div>
    <div class="flex-grow" />
    <el-sub-menu v-for="(route, index) in routesList" :key="route.name" :index="`${index}`">
      <template #title>
        <span>
          {{ route.name }}
        </span>
      </template>
      <el-menu-item
        v-for="(routeItem, idx) in route.routesList"
        :key="routeItem.name"
        @click="handleRoute(routeItem.route)"
        :index="`${index}-${idx}`"
      >
        {{ routeItem.name }}
      </el-menu-item>
    </el-sub-menu>
    <el-input v-model="searchValue" placeholder="Please input" clearable @input="handleInput" />
  </el-menu>
  <div v-if="isShowResult" class="tw-h-64 tw-overflow-y-auto tw-px-10 tw-border">
    <div
      v-for="res in searchResult.results"
      :key="res.id"
      class="search-item tw-my-2 tw-flex tw-items-center"
      @click="routeToMovie(res.id)"
    >
      <img :src="`https://image.tmdb.org/t/p/w500/${res.poster_path}`" width="70" alt="poster" class="tw-mr-4" />
      <div>
        <h1 class="tw-text-xl tw-font-bold">
          {{ res.title }}
        </h1>
        <h2 class="tw-text-lg tw-font-semibold">
          {{ res.release_date }}
        </h2>
      </div>
    </div>
  </div>
  <router-view v-slot="{ Component }">
    <suspense>
      <template #default>
        <component :is="Component"></component>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </suspense>
  </router-view>
</template>

<script setup lang="ts">
  import type { RoutesList } from './types/routes';
  import type { Ref } from 'vue';
  import { searchMovies } from './api/films';
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import type { MoviesResult } from './types/movies';

  const router = useRouter();
  const activeIndex: Ref<string> = ref('0');
  const routesList: RoutesList[] = reactive([
    {
      name: 'Movies',
      isShowMenu: false,
      routesList: [
        { name: 'Popular', route: 'Movies' },
        { name: 'Top Rated', route: 'Top Rated' },
      ],
    },
    { name: 'TV Shows', isShowMenu: false, routesList: [{ name: 'Popular', route: 'TV Shows' }] },
  ] as RoutesList[]);

  function handleRoute(path: string): void {
    routesList.map((item) => {
      item.isShowMenu = false
      return item;
    });
    router.push({ name: path });
  }

  const searchValue: Ref<string> = ref('');
  let isShowResult: Ref<boolean> = ref(false);
  let searchResult: Ref<MoviesResult> = ref({} as MoviesResult);

  const handleInput = async (value: string): Promise<void> => {
    try {
      const res: MoviesResult = await searchMovies(value);
      searchResult.value.results = [...res.results];
      isShowResult.value = searchResult.value.results.length > 0;
    } catch {
      isShowResult.value = false;
    }
  };

  const routeToMovie = (id: number): void => {
    router.push({ name: 'Movie', params: { id } });
  };
</script>

<style lang="scss" scoped>
  .el-input {
    max-width: 400px;
    padding: 10px;
  }
  .search-item {
    box-shadow: 0 0px 22px -10px black;
    cursor: pointer;
  }
</style>
