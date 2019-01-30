<template>
  <div>
    <ul class="tasks">
      <li v-for="task in unCompletedTodo" :class="{complete : task.complete}">
        <label class="task">
          <ui-checkbox type="checkbox" v-model="task.complete" />
          <span class="task-text">{{task.name}}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      unCompletedTodo: 'unCompletedTodo'
    })
  }
}
</script>