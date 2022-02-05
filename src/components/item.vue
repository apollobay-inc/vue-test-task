<template>
  <div class="checkbox">
    <label class="todo">
      <ui-checkbox :checked="isChecked" @change="onChange" value="" :class="{complete: isChecked}">
        {{ text }}
      </ui-checkbox>
    </label>
    <div class="delete">
    <ui-button color="red" icon="delete" @click="onDelete" type="secondary">Delete</ui-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  model: {
    event: "change",
    prop: "isChecked",
  },
  props: {
    text: String,
    isChecked: Boolean,
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    },
    onDelete(){
      this.$emit("delete");
    }
  },
};
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  .delete {
    padding-left: 10px;
  }
  .todo {
    padding-top: 5px;
    .complete{
    text-decoration: line-through;
    }
  }
}
</style>