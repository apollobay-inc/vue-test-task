<template>
  <div class="todo">
    <h1 class="title">Checklist</h1>
    <ui-tabs backgroundColor="clear">
      <ui-tab
        :key="tab.title"
        :title="tab.title"
        v-for="tab in stateTabs"
      >
        <div v-if="tab.title === 'Pending'">
          <ul class="tasks">
            <li
              v-for="(task, index) in tasks"
              :key="index"
              :class="{ complete: task.complete }"
            >
              <div v-if="!task.complete">
                <item
                  :text="task.name"
                  :isChecked="task.complete"
                  v-model="task.complete"
                ></item>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="tab.title === 'Completed'">
          <ul class="tasks">
            <li
              v-for="(task, index) in tasks"
              :key="index"
              :class="{ complete: task.complete }"
            >
              <div v-if="task.complete">
                <item
                  :text="task.name"
                  :isChecked="task.complete"
                  v-model="task.complete"
                ></item>
              </div>
            </li>
          </ul>
        </div>
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
        :disabled="isAdd"
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
      isAdd: true,
      stateTabs: [{ title: "Pending" }, { title: "Completed" }],
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
    newTaskName: function (val) {
      if (val.length > 0) {
        this.isAdd = false;
      } else {
        this.isAdd = true;
      }
    },
  },
  methods: {
    addTask() {
      if (this.newTaskName.length > 0) {
        this.tasks.push({ name: this.newTaskName, complete: false });
        this.newTaskName = "";
      }
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
  .tabs {
    padding: 0;
  }
  .tasks {
    list-style: none;
    padding: 0;
    overflow: auto;
    height: 300px;
    width: 500px;
  }
  .complete {
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