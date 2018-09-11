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
    import { isEmpty, filter, map, pathEq, reverse, pipe } from 'ramda';
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
                tasks : [
                    {name : 'create skeleton of todo', complete : false},
                    {name : 'add ability to add tasks', complete : false},
                    {name : 'clear task name after clicking "Add"', complete : false},
                    {name : 'put "Add" button in one line with input', complete : false},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : false},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : false},
                    {name : 'when task is complete cross it out', complete : false},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {name : 'don\'t allow to add empty tasks', complete : false},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {name : 'extract list item into a separate vue.js component', complete : false},
                    {name : 'persist tasks list in a local storage', complete : false},
                    {name : 'add animation on task completion', complete : false},
                ]
            }
        },
        created () {
            const checkTasksInStorage = map(task => {
                if (isEmpty(this.$localStorage.get(task.name))) {
                    this.$localStorage.set(task.name, task.complete)
                } else {
                    const statusInStorage = this.$localStorage.get(task.name);
                    task.complete = JSON.parse(statusInStorage);
                }
                return task;
            });
            this.tasks = checkTasksInStorage(this.tasks);
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
                return !isEmpty(this.error);
            },
            isPandingListEmpty () {
                return isEmpty(this.pandingTasks);
            }
        },
        methods : {
            addTask () {
                if (isEmpty(this.newTaskName)) {
                    this.error = 'Empty input';
                    return;
                }
                if (this.checkIfAdded(this.newTaskName)) {
                    this.error = 'Task already in list';
                    return;
                }

                this.error = '';
                this.$localStorage.set(this.newTaskName, false);
                const newTask = { name : this.newTaskName, complete : false };
                this.tasks = [...this.tasks, newTask];
                this.newTaskName = '';
            },
            checkIfAdded (taskName) {
                const isTaskExist = pathEq(['name'], taskName);
                const checkExists = pipe(
                    filter(isTaskExist),
                    isEmpty
                )
                return checkExists(this.tasks);
            },
            changeCurrentList () {
                this.taskList = !this.taskList;
            },
            //Done, because something's wrong with check tick in ckecboxes when it's v-model
            changeStatus (status, task) {
                this.$localStorage.set(task.name, status);
                setTimeout(() => {
                    task.complete = status;
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
