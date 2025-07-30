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
    getters: {},
    actions: {
        getTodos({ commit }) {
            return axios.get('http://localhost:3000/todos')
                .then(response => {
                    commit('storeTodos', response.data);
                    // todos.value = response.data;
                    console.log('buscou dados', response.data);
                })
                
        },
        addTodo({ commit }, data) {
            // commit('addTodo', data);
            return axios.post('http://localhost:3000/todos', data).then((response) => {
                commit('addTodo', response.data);
                console.log('add todo-------------------', response.data);
            })
        },
        updateTodo(context, { id, data}) {
            console.log('update todo-------------------', id, data);
            return axios.post(`http://localhost:3000/todos/${id}`, data)            
        }
    },
    modules: {}
})