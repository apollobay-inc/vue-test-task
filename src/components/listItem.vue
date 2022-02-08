<template>
    <li>
        <ui-checkbox v-model="task.complete">{{ task.name }}</ui-checkbox>
        <ui-icon-button class="delete-btn"
                        color="red"
                        icon="delete"
                        size="small"
                        type="secondary"
                        @click="removeTask(task)"></ui-icon-button>
    </li>
</template>

<script>
export default {
    props: ['task'],
    methods: {
        removeTask(task) {
            console.log('removing form element', task)
            this.$emit('remove', task);
        }
    }
};
</script>

<style scoped lang="scss">
    li{
        display: flex;
        align-items: flex-end;
    }
    .delete-btn{
        margin-left: auto;
        flex-shrink: 0;
        cursor: pointer;
    }
</style>
