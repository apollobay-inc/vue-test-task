<template>
    <ul class="tasks">
        <transition-group name="list" tag="p">
            <li class="task" v-for="task in tasks" :class="{complete : task.complete}" v-bind:key="task.name">
                <ui-checkbox class="checkbox" v-model="task.complete" @change="setLocalStorage(task)">{{task.name}}</ui-checkbox>
            </li>
        </transition-group> 
    </ul>
</template>

<script>
import { UiCheckbox } from 'keen-ui';

export default {
    name: 'list',
    components: {
        UiCheckbox,
    },
    props: ['tasks'],
    methods: {
        setLocalStorage(completedTask) {          
            const data = localStorage.getItem('tasks');
            const localStorageTasks = JSON.parse(data);
            localStorageTasks.forEach(task => {
                if (task.name === completedTask.name) {
                    task.complete = completedTask.complete
                }
            });
            localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
        }
    }

}
</script>

<style scoped lang="scss">

    .tasks {
        list-style: none;
        padding: 0;
        height: 400px;
        overflow: auto;
        scrollbar-width: none;

        .task {
            height: 40px;
            margin: 10px 0px;
            display: flex;
            align-content: center;
            padding-left: 20px; 
        }

        .complete {
            text-decoration: line-through;
        }
    }

    .tasks::-webkit-scrollbar {
        width: 0px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s ease;
    }
    .list-leave-active, .list-leave-to {
        text-decoration: line-through;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

</style>