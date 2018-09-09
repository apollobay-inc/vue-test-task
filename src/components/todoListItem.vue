<template>
    <label :class="{complete : task.complete}">
        <ui-checkbox v-model="task.complete">{{ task.name }}</ui-checkbox>
    </label>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.complete {
  text-decoration: line-through;
}
</style>


