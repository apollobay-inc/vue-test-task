<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs fullwidth>
            <ui-tab v-for="tab in tabs">
                <div slot="header" class="tab-header">
                    <span>{{ tab.title }}: </span>
                </div>
                <ul class="tasks">
                    <list-item
                        v-for="task in tasks"
                        v-bind:task="task"
                        :class="{complete : task.complete}"
                        v-if="task.complete == tab.complete"></list-item>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="input__wrapper">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" class="input" v-on:keyup.native.enter="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add" class="add-task-btn" v-bind:disabled='!isDisabled'>Add</ui-button>
        </div>
    </div>
</template>

<script>
    import listItem from "./listItem";
    export default {
        data () {
            return {
                newTaskName : '',
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
                ],
                tabs : [
                    { title: "Complete", complete : true },
                    { title: "Pending", complete : false }
                ]
            }
        },
        components : {
            listItem
        },
        methods : {
            addTask () {
                if( this.newTaskName !== '' && this.newTaskName !== null && this.newTaskName.length > 0 ) {
                    this.tasks.push({name: this.newTaskName, complete: false});
                    this.newTaskName = "";
                }
            }
        },
        computed: {
            isDisabled() {
                return this.newTaskName.length > 0;
            }
        },
    };
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            max-height: 300px;
            overflow-y: auto;
        }
    }
    .input__wrapper{
        display: flex;
        justify-content: space-between;
        //flex-wrap: wrap;
    }
    .input{
        width: 100%;
        max-width: 70%;
        flex-shrink: 2;
    }
    .add-task-btn{
        flex-shrink: 0;
    }
    .complete{
        text-decoration: line-through;
    }
    .ui-tabs{
        width: 370px;
    }
</style>
