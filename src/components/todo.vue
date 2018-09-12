<template>
    <div class="todo__list">
        <header>
            <h2 class="title">Checklist</h2>
            <ui-icon  icon="more_vert"></ui-icon>
        </header> 
        <ui-tabs type="text" @tab-change="toggleTasks" >
            <ui-tab title="Pending" >
            </ui-tab>
            <ui-tab title="Completed" >
            </ui-tab>
            <taskList v-bind:tasks="tasks" v-bind:completed="displayCompletedTasks" ></taskList>
        </ui-tabs>
        <div class="add__task__container">
            <ui-textbox class="add_task_input" placeholder="add an item here"
             v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask">Add item</ui-button>
        </div>
    </div>
</template>

<script>
import taskList from './taskList';
    export default {
        components:{ taskList },
        data () {
            return {
                newTaskName : '',
                displayCompletedTasks: false,
                tasks : []
            }
        },
        mounted() {
            if(!localStorage.getItem('tasks').indexOf('undefined')) {
                let localTasks = [
                    {name : 'Pending task', complete : false},
                    {name : 'create skeleton of todo', complete : true},
                    {name : 'add ability to add tasks', complete : true},
                    {name : 'clear task name after clicking "Add"', complete : true},
                    {name : 'put "Add" button in one line with input', complete : true},
                    {name : 'add new task by hitting Enter instead of clicking "Add"', complete : true},
                    {name : 'replace <input> with <ui-checkbox> in tasks list', complete : true},
                    {name : 'when task is complete cross it out', complete : true},
                    {name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : true},
                    {name : 'don\'t allow to add empty tasks', complete : true},
                    {name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : true},
                    {name : 'extract list item into a separate vue.js component', complete : true},
                    {name : 'persist tasks list in a local storage', complete : true},
                    {name : 'add animation on task completion', complete : true},
                ];
                localTasks.forEach(function (todo, index) {
                    todo.id = index
                })
                localStorage.setItem('tasks', JSON.stringify(localTasks))
                this.tasks = localTasks;
            } else {
                let localTasks = localStorage.getItem('tasks')
                this.tasks = localTasks;
            }
        },
        watch: {
            tasks: {
                 handler: function (tasks) {
                    localStorage.tasks = localStorage.setItem('tasks', JSON.stringify(tasks))
                },
                deep: true
            }
        },
        methods : {
            addTask () {
                if(this.newTaskName){
                    this.tasks.push({name : this.newTaskName, complete : false, id: this.tasks.length });
                    this.newTaskName = '';
                }
            },
             toggleTasks: function(){
                this.displayCompletedTasks = !this.displayCompletedTasks;
            },
        }
    };
</script>

<style scoped lang="scss">
    .todo__list {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        width: 33%;

        .title {
            margin-top: 0;
        }
        .tasks {
            list-style: none;
            padding: 0;
            max-height: 200px;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .add__task__container {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
        .add__task__container>div.ui-textbox {
            flex: 1;
        }
        header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
       
    }
    
</style>
