<template>
    <div>
        <li
            v-for="task in tasks"
            :class="['task', {complete : task.complete}]"
            :key="task.id"
        >
        <transition name="task-item">
            <label>
                <ui-checkbox
                    class="checkbox"
                    type="checkbox"
                    v-model="task.complete"
                />
                {{task.name}}
            </label>
        </transition>
        </li>
    </div>
</template>
<script>
export default {
    name: 'TodoItem',
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.task {
    & > label {
        display: flex;
        align-items: flex-start;
    }
}

.task-item-enter-active {
  animation: bounce-in .5s;
}

.task-item-leave-active  {
  animation: bounce-in .5s;
}

@keyframes bounce-in {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.checkbox {
    margin-right: 20px;
}

.complete {
    text-decoration: line-through;
}
</style>
