<template>
  <div class="checkbox">
    <label class="todo">
      <ui-checkbox
        :checked="isChecked"
        @change="onChange"
        value=""
        :class="{ complete: isChecked }"
        :disabled="onEditState"
      >
        <ui-textbox
          v-if="onEditState"
          :value="text"
          v-model="newTaskName"
          @keydown-enter="confirmNewTaskText(newTaskName)"
        />
        <template v-else>{{ text }}</template>
      </ui-checkbox>
    </label>
    <div class="delete">
      <ui-icon-button
        color="primary"
        has-dropdown
        icon="more_vert"
        ref="dropdownButton"
        :size="size"
      >
        <ui-menu
          contain-focus
          has-icons
          slot="dropdown"
          :options="menuOptions"
          @close="$refs.dropdownButton.closeDropdown()"
          @select="selectOption"
        >
        </ui-menu>
      </ui-icon-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "normal",
      onEditState: false,
      newTaskName: this.text,
      menuOptions: [
        {
          label: "Edit",
          icon: "edit",
        },
        {
          label: "Delete",
          icon: "delete",
        },
      ],
    };
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
    onDelete() {
      this.$emit("delete");
    },
    onEdit(event) {
      this.onEditState = true;
      this.$emit("edit", event);
    },
    confirmNewTaskText(event) {
      this.onEditState = false;
      this.$emit("confirm", event)
    },
    selectOption(option) {
      if (option.label === "Delete") {
        return this.onDelete();
      }
      if (option.label === "Edit") {
        return this.onEdit();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  .delete {
    padding-left: 10px;
  }
  .todo {
    padding-top: 5px;
    .complete {
      text-decoration: line-through;
    }
  }
}
</style>