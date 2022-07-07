<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{counter}}
    {{dubbleCount}}
    <button @click="addOne">Up</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useCounterStore } from '@/store/useConter';
  import { mapActions, mapState, mapGetters} from 'pinia'
  
  export default defineComponent({
    data: () => ({
    }),
    computed: {
      ...mapState(useCounterStore, ['counter']),
      ...mapGetters(useCounterStore, ['dubbleCount'])
    },
    methods: {
      ...mapActions(useCounterStore, ['reset', 'addOne'])
    }
  })
</script>


<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>
