<template>
    <div>
        <li v-for="task in tasks" :class="{complete : task.complete}">
            <transition name="tasks-checkbox">
                <ui-checkbox v-show="task.complete==taskComplete" v-model="task.complete" @change="changeStatus">{{task.name}}</ui-checkbox>
            </transition>
        </li>
    </div>
</template>

<script>
    export default {
        props: ['tasks', 'taskComplete'],
        methods: {
            changeStatus() {
                this.saveTasks();
            },
            saveTasks() {
                const parsed = JSON.stringify(this.tasks);
                localStorage.setItem('tasks', parsed);
            }
        }
    }
</script>

<style scoped lang="scss">
    .tasks-checkbox-leave-active {
        opacity: 0;
        transition: opacity 1s;
        text-decoration: line-through;
    }
</style>