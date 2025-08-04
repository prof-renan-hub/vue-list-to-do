<template>
    <TodoSpinner v-if="loading" />
    <div class="bg-gray-300 rounded-sm" v-else>
        <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
            <div class="flex items-center justify-center mr-2 hover:bg-green-200 rounded-full p-1"
                @click="finalizeTodo">
                <button class="cursor-pointer text-gray-500"
                    v-bind:disabled="todo.completed">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        :class="{ 'text-green-500': todo.completed }"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </button>
            </div>

            <div class="w-full">
                <input 
                @keyup.enter="updateTodo"
                v-bind:class="{ 'line-through': todo.completed }"
                :disabled="todo.completed  "
                type="text" placeholder="Digite a sua tarefa" :value="todo.title" class="bg-gray-300 placeholder-gray-500 
                text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3">
            </div>

            <div class="ml-auto flex items-center justify-center hover:bg-red-200 rounded-full p-1"
                @click="deleteTodo">
                <button class="cursor-pointer focus:outline-none ">
                    <svg class="m-1 h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7L18.1327 19.1425C18.0579 
                    20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
                    19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
                    3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import { useStore } from 'vuex';
import TodoSpinner from './TodoSpinner.vue';

const loading = ref(false);
const store = useStore(); // Corrigido: movido para o topo

const props = defineProps({
    todo: {
        type: Object,
        default: () => ({})
    }
});

function updateTodo($event) {
    loading.value = true; // Inicia o carregamento
    console.log('Função updateTodo chamada, prevenindo reload. Título:', $event.target.value);
    const newTitle = $event.target.value;

    const payload = {
        id: props.todo.id,
        data: {
            title: newTitle,
            completed: props.todo.completed
        }
    };

    store.dispatch('updateTodo', payload).finally(() => {
        setTimeout(() => {
            loading.value = false; // Finaliza o carregamento
        }, 1000); // Simula um atraso de 1 segundo
        console.log('Tarefa atualizada com sucesso!');
    })
}

function deleteTodo() {
    loading.value = true; 
    console.log('Função deleteTodo chamada, prevenindo reload.', props.todo);
    store.dispatch('deleteTodo', props.todo.id)
        .finally(() => {
             setTimeout(() => {
                loading.value = false;
            }, 3000); 
            console.log('Tarefa deletada com sucesso!');
        });
}

function finalizeTodo() {
    loading.value = true; 
    console.log('Função finalizeTodo chamada, prevenindo reload.', props.todo);
    const payload = {
        id: props.todo.id,
        data: {
            title: props.todo.title,
            completed: !props.todo.completed
        }
    };

    store.dispatch('updateTodo', payload).finally(() => {
        setTimeout(() => {
            loading.value = false; 
        }, 1000); 
        console.log('Tarefa finalizada com sucesso!');
    });
}
</script>