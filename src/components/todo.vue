<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs class="tasks">
            <ui-tab
                :key="tab.title"
                :selected="tab.title === 'completeTasks'"
                :title="tab.title"
                v-for="tab in tabs"
            >
                <template v-if="tab.title === 'Pending'">
                    <todo-item :tasks="completeTasks"></todo-item>
                </template>
                <template v-else>
                    <todo-item :tasks="pendingTasks"></todo-item>
                </template>
            </ui-tab>
        </ui-tabs>


        <div class="add-note">
            <ui-textbox
                class="input"
                placeholder="e.g. 'read vue.js guide'"
                v-model.trim="newTask.name"
                @keydown.enter="addTask">
            </ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
        components:{ TodoItem },
        data () {
                return {
                tabs: [
                    {title: 'Complete'},
                    {title: 'Pending'},
                ],
                newTask : {
                    name : '',
                    complete : false
                },
                tasks : [
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
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
        computed: {
            completeTasks() {
                return this.tasks.filter((task) => {
                    if (task.complete === true) {
                        return task;
                    }
                });
            },
            pendingTasks() {
                return this.tasks.filter((task) => {
                    if (task.complete !== true) {
                        return task;
                    }
                });
            }
        },
        methods : {
            addTask () {
                const { name, complete } = this.newTask;
                const id = new Date(Date.now()).toLocaleString();

                if (name === '') return;

                this.tasks.push({
                    id,
                    name,
                    complete
                });

                this.setLocalTasks();

                this.clearFiled();
            },
            clearFiled() {
                this.newTask.name = '';
            },
            setLocalTasks() {
                const parsed = JSON.stringify(this.tasks);
                localStorage.setItem('tasks', parsed);
            }
        },
        mounted() {
            if (localStorage.tasks) {
                this.tasks = JSON.parse(localStorage.getItem('tasks'));
            }
        },
        watch: {
            tasks: {
                handler(val){
                    this.setLocalTasks();
                },
                deep: true
            }
        }
    };
</script>

<style scoped lang="scss">
    .todo {
        width: 100%;
        max-width: 800px;
        min-height: 600px;
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        display: flex;
        flex-direction: column;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            margin-bottom: auto;

            height: 400px;
            overflow-y: scroll;
        }

        .add-note {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .input {
                width: 70%;
            }
        }
    }
</style>
