<script setup>
import TodoFormAdd from './components/TodoFormAdd.vue';
import TodoItens from './components/TodoItens.vue';
import TodoSpinner from './components/TodoSpinner.vue';


</script>

<template>
  <!-- Content -->
  <div class="w-full px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2  mx-auto">
      <TodoSpinner />

      <TodoFormAdd />

      <TodoItens />

      <!-- Todo items -->

      <!--/ Todo items -->

      <!-- Todo empty -->
      <div class="text-center text-lg text-gray-500">
        Você ainda não tem nenhuma tarefa.
      </div>
      <!--/ Todo empty -->
    </div>
  </div>
</template>

<style scoped></style>
