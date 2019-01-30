import Vue from'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
        {name : 'create skeleton of todo', complete : true},
        {name : 'add ability to add tasks', complete : true},
        {name : 'clear task name after clicking "Add"', complete : true},
        {name : 'put "Add" button in one line with input', complete : true},
        {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
        {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
        {name : 'when task is complete cross it out', complete : true},
        {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
        {name : 'don\'t allow to add empty tasks', complete : true},
        {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
        {name : 'extract list item into a separate vue.js component', complete : true},
        {name : 'persist tasks list in a local storage', complete : true},
        {name : 'add animation on task completion', complete : false},
    ]
  },
  getters: {
    completedTodo(state) {
      return state.tasks.filter(todo => todo.complete === true)
    },
    unCompletedTodo(state) {
      return state.tasks.filter(todo => todo.complete === false)
    }
  },
  mutations: {
    addTask (state, payload) {
        state.tasks.push(payload);
    }
  }
})