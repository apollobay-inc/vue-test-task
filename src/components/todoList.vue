<template>
    <transition-group name="fade" tag="ul" class="todo-list">
        <li v-if="task.complete === complete" v-for="task in tasks" :key="task.name">
            <todo-list-item :task="task"></todo-list-item>
        </li>
    </transition-group>
</template>

<script>
import todoListItem from "./todoListItem.vue";

export default {
  components: {
    todoListItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    complete: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-list {
  list-style: none;
  padding: 0;
  min-width: 600px;
  height: 400px;
  overflow: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


