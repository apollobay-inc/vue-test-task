<template>
  <label>
    <ui-checkbox
      :checked="isChecked"
      @change="onChange"
      value=""
    >
      {{ text }}
    </ui-checkbox>
  </label>
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
    onChange (event) {
     this.$emit('change', event)
    }
  }
};
</script>

<style scoped lang="scss">
</style>