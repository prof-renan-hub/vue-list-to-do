import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        todos: []
    },
    mutations: {
        storeTodos(state, payload) {
            console.log('payload', payload);
            state.todos = payload;
        }
        ,
        addTodo(state, payload) {
            state.todos.push(payload);
        }
    },
    actions: {
        getTodos({ commit }) {
            return axios.get('http://localhost:3000/todos')
                .then(response => {
                    commit('storeTodos', response.data);
                    // todos.value = response.data;
                })
                
        },
        addTodo({ commit }, data) {
            // commit('addTodo', data);
            return axios.post('http://localhost:3000/todos', data).then((response) => {
                commit('addTodo', response.data);
            })
        },
        updateTodo(context, { id, data}) {
            return axios.put(`http://localhost:3000/todos/${id}`, data).then(() => {
                context.dispatch('getTodos'); // Atualiza a lista de tarefas após a atualização
            })       
        },
        deleteTodo(context, id) {
            return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
                context.dispatch('getTodos'); // Atualiza a lista de tarefas após a exclusão
            })
        }
    }
})