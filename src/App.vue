<template>
  <div class="w-full px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

      <TodoSpinner v-if="loading"/>

      <template v-else>
        <TodoFormAdd />
  
        <TodoItens />
  
        <TodoEmpty />
      </template>
    </div>
  </div>
</template>

<script setup>
import TodoEmpty from './components/TodoEmpty.vue';
import TodoFormAdd from './components/TodoFormAdd.vue';
import TodoItens from './components/TodoItens.vue';
import TodoSpinner from './components/TodoSpinner.vue';
import { ref } from 'vue'
import axios from 'axios';
import { useStore } from 'vuex';

// const todos = ref([]);
const store = useStore()

const loading = ref(true);

axios.get('http://localhost:3000/todos')
  .then(response => {
    store.commit('storeTodos', response.data);
    // todos.value = response.data;
    console.log(store.state.todos);
  })
  .catch(error => {
    console.error('There was an error!', error);
  })
  .finally(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1500);
    // loading.value = false;
  });


</script>

<style scoped></style>
