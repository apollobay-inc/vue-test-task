<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text">
            <ui-tab title="Pending">
                <transition-group 
                    v-if="!isPandingListEmpty" 
                    tag="ul" 
                    name="todo-panding" 
                    mode="out-in" 
                    class="tasks"
                >
                    <li v-for="task in pandingTasks" :key="task.name">
                        <todo-item :task="task" @changeState="changeStatus" />
                    </li>
                </transition-group>
                <div v-if="isPandingListEmpty" class="text-center">
                    <p>You've done all tasks.</p>
                    <p>Try to add more...</p>
                </div>
            </ui-tab>
            <ui-tab title="Completed">
                <ul class="tasks">
                    <li v-for="task in completedTasks" 
                        :key="task.name" 
                        :class="{complete : task.complete}"
                    >
                        <todo-item :task="task" @changeState="changeStatus" />
                    </li>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="actions">
            <ui-textbox 
                :invalid="addTaskError" 
                :error="error"  
                placeholder="Add an item here" 
                @keydown.enter="addTask" 
                v-model="newTaskName"
            >
            </ui-textbox>
            <ui-button color="primary" @click="addTask">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import { isEmpty, filter, map, pathEq, reverse, pipe, not } from 'ramda';
    import TodoItem from './TodoItem.vue';

    export default {
        components: {
            TodoItem
        },
        data () {
            return {
                newTaskName : '',
                currentCompleted : false,
                taskList : true,
                error: '',
                tasks : []
            }
        },
        created () {
            const tasks = JSON.parse(this.$localStorage.get('tasks'))
            if (not(tasks)) return;

            this.tasks = tasks
        },
        computed: {
            pandingTasks () {
                const isPanding = pathEq(['complete'], false);
                return filter(isPanding, this.tasks); 
            },
            completedTasks () {
                const isComplete = pathEq(['complete'], true);
                const completedOrderByNew = pipe(
                    filter(isComplete),
                    reverse
                    )
                return completedOrderByNew(this.tasks);
            },
            addTaskError () {
                const notEmpty = pipe(
                    isEmpty,
                    not
                )
                return notEmpty(this.error);
            },
            isPandingListEmpty () {
                return isEmpty(this.pandingTasks);
            }
        },
        methods : {
            addTask () {
                if (this.checkForInputErrors()) return;

                const newTask = { name : this.newTaskName, complete : false };
                this.tasks = [...this.tasks, newTask];
                this.saveTaskInStorage();
                this.newTaskName = '';
            },
            checkForInputErrors () {
                if (isEmpty(this.newTaskName)) {
                    this.error = 'Empty task cannot be added';
                    return true;
                }
                if (this.checkIfAdded(this.newTaskName, this.pandingTasks)) {
                    this.error = 'Task already in list';
                    return true;
                }
                if (this.checkIfAdded(this.newTaskName, this.completedTasks)) {
                    this.error = 'You have done this task';
                    return true;
                }
                
                this.error = '';
                return false;
            },
            checkIfAdded (taskName, list) {
                const isTaskExist = pathEq(['name'], taskName);
                const checkExists = pipe(
                    filter(isTaskExist),
                    isEmpty,
                    not
                )
                return checkExists(list);
            },
            saveTaskInStorage () {
                this.$localStorage.set('tasks', JSON.stringify(this.tasks));
            },
            changeCurrentList () {
                this.taskList = !this.taskList;
            },
            //Done, because something's wrong with check tick in ckecboxes when it's v-model
            changeStatus (status, task) {
                setTimeout(() => {
                    task.complete = status;
                    this.saveTaskInStorage();
                }, 100);
            }
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        width: 30%;
        min-height: 60%;
        overflow: hidden;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        transition: height .5s;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            height: 200px;
            overflow-y: auto;

            .complete {
                text-decoration: line-through;
            }
        }

        .ui-tab {
            height: 200px;
        }

        .actions {
            display: flex;
            justify-content: space-around;
            height: 70px;

            .ui-textbox {
                width: 100%;
            }
            .ui-button {
                height: 2rem;
            }
        }
    }

    .error {
        border: 1px solid #f00;
    }

    .text-center {
        text-align: center;
    }

    // Animations & Transitions
    .todo-panding-leave-active {
        position: absolute;
    }

    .todo-panding-move {
        transition: all .6s;
    }

    .todo-panding-leave-to {
        animation: bounce-item .5s;
        text-decoration: line-through;
    }

    .todo-panding-enter-active {
        transition: all .6s;
        transform: translateX(-80%);
    }

    .todo-panding-enter-to {
        transform: translateX(0);
    }

    @keyframes bounce-item{
        0% {
            transform: scale(1);
        }
        40%{
            transform: scale(1.2);
        }
        100%{
            transform: scale(0);
        }
    }
</style>
