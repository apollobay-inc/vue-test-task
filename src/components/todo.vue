<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs fullwidth>
            <ui-tab title="Pending">
                <todo-list :tasks="tasks" :complete="false"></todo-list>
            </ui-tab>
            <ui-tab title="Complete">
                <todo-list :tasks="tasks" :complete="true"></todo-list>
            </ui-tab>
        </ui-tabs>
        <div class="actions">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" class="actions-input" @keyup.native.enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
import todoList from "./todoList.vue";

export default {
  components: {
    todoList
  },
  data() {
    return {
      newTaskName: "",
      tasks: [
        { name: "create skeleton of todo", complete: true },
        { name: "add ability to add tasks", complete: true },
        { name: 'clear task name after clicking "Add"', complete: false },
        { name: 'put "Add" button in one line with input', complete: false },
        {
          name: 'add new task by hitting Enter instead of clicking "Add"',
          complete: true
        },
        {
          name: "replace <input> with <ui-checkbox> in tasks list",
          complete: false
        },
        { name: "when task is complete cross it out", complete: false },
        {
          name:
            'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>',
          complete: false
        },
        { name: "don't allow to add empty tasks", complete: false },
        {
          name: "make list of tasks scrollable, if there're are a lot of tasks",
          complete: false
        },
        {
          name: "extract list item into a separate vue.js component",
          complete: false
        },
        { name: "persist tasks list in a local storage", complete: false },
        { name: "add animation on task completion", complete: false }
      ]
    };
  },
  mounted() {
    this.getTasksFromStorage();
  },
  methods: {
    addTask() {
      if (this.newTaskName.trim() !== "") {
        this.tasks.push({ name: this.newTaskName, complete: false });
        this.setTasksToStorage();
        this.newTaskName = "";
      }
    },
    setTasksToStorage() {
      const tasks = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", tasks);
    },
    getTasksFromStorage() {
      if (localStorage.getItem("tasks")) {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.todo {
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

  .title {
    margin-top: 0;
  }

  .actions {
    display: flex;
    justify-content: space-between;

    &-input {
      flex-grow: 1;
      padding-right: 15px;
    }
  }
}
</style>
