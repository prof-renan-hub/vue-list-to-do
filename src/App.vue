<template>
  <div class="w-full px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2  mx-auto">
      <TodoSpinner />

      <TodoFormAdd />

      <TodoItens />

      <TodoEmpty />
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

const todos = ref([]);

axios.get('http://localhost:3000/todos')
  .then(response => {
    todos.value = response.data;
    console.log(todos.value);
  })
  .catch(error => {
    console.error('There was an error!', error);
  });


</script>

<style scoped></style>
