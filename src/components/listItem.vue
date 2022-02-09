<template>
    <transition name="fade">
        <li>
            <ui-checkbox v-model="task.complete">{{ task.name }}</ui-checkbox>
            <ui-icon-button class="delete-btn"
                            color="red"
                            icon="delete"
                            size="small"
                            type="secondary"
                            @click="removeTask(task)"></ui-icon-button>
        </li>
    </transition>
</template>

<script>
export default {
    props: ['task'],
    methods: {
        removeTask(task) {
            this.$emit('remove', task);
        }
    }
};
</script>

<style scoped lang="scss">
li {
    display: flex;
    align-items: flex-end;
    border-bottom: solid 1px transparent;
    margin: 10px 0;
    transition: 500ms cubic-bezier(.87, -.41, .19, 1.44);

    &:hover {
        border-bottom: solid 1px #2c3e50;
    }
}

.delete-btn {
    margin-left: auto;
    flex-shrink: 0;
    cursor: pointer;
}

.complete label {
    text-decoration: line-through;
}

.fade-move,
.fade-leave-active,
.fade-enter-active, {
    transition: 500ms cubic-bezier(.87, -.41, .19, 1.44);
}

.fade-enter,
.fade-leave-active {
    transform: translate(100%, 0);
    opacity: 0;
}
</style>
