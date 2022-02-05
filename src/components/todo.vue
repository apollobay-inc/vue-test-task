<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>
    <ui-tabs backgroundColor="clear">
      <ui-tab key="Pending" title="Pending">
        <ul class="tasks">
          <li
            v-for="(task, index) in pendingTasks"
            :key="index"
          >
            <item
              :text="task.name"
              :isChecked="task.complete"
              @delete="deleteTask(task.id)"
              v-model="task.complete"
            ></item>
          </li>
        </ul>
      </ui-tab>
      <ui-tab key="Completed" title="Completed">
        <ul class="tasks">
          <li
            v-for="(task, index) in completedTasks"
            :key="index"
          >
            <item
              :text="task.name"
              :isChecked="task.complete"
              @delete="deleteTask(task.id)"
              v-model="task.complete"
            ></item>
          </li>
        </ul>
      </ui-tab>
    </ui-tabs>

    <div class="add">
      <ui-textbox
        class="textbox"
        :maxlength="100"
        placeholder="e.g. 'read vue.js guide'"
        v-model="newTaskName"
        @keydown-enter="addTask"
      ></ui-textbox>
      <ui-button
        color="primary"
        :disabled="!isAdd"
        @click="addTask"
        class="button"
        >Add item</ui-button
      >
    </div>
  </div>
</template>

<script>
import item from "../components/item.vue";
const TODO_ITEMS = "todoItems";
export default {
  components: { item },
  data() {
    return {
      newTaskName: "",
      tasks: [],
    };
  },
  created: function () {
    const storedTasks = localStorage.getItem(TODO_ITEMS);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  },
  watch: {
    tasks: {
      handler: function () {
        localStorage.setItem(TODO_ITEMS, JSON.stringify(this.tasks));
      },
      deep: true,
    },
  },
  computed: {
    isAdd() {
      return this.newTaskName.length > 0;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.complete);
    },
    pendingTasks() {
      return this.tasks.filter((task) => !task.complete);
    },
  },
  methods: {
    addTask() {
      if (this.isAdd) {
        this.tasks.push({
          name: this.newTaskName,
          complete: false,
          id: this.createId(),
        });
        this.newTaskName = "";
      }
    },
    deleteTask(id) {
      const indexOfTask = this.tasks.findIndex(task => task.id === id);
      this.tasks.splice(indexOfTask, 1);
    },
    createId() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
    },
  },
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
  .tasks {
    list-style: none;
    padding: 0;
    overflow: auto;
    height: 300px;
    width: 500px;
  }
  .complete {
    display: flex;
    align-items: center;
    text-decoration: line-through;
  }
  .add {
    display: flex;
    justify-content: space-between;
    .textbox {
      width: 350px;
    }
    .button {
      border-radius: 1rem;
    }
  }
}
</style>