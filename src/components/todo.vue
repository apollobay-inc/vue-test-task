<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs
            :background-color="backgroundColor"
            :fullwidth="fullwidth"
            :indicator-color="indicatorColor"
            :raised="raised"
            :text-color-active="textColorActive"
            :text-color="textColor"
            :type="type"
        >
            <ui-tab
                :key="tab.title"
                :selected="tab.title === 'Pending'"
                :title="tab.title"
                v-for="tab in tabs"
            >
                <div v-if="tab.title === 'Pending'">
                    <list :tasks="pendingTasks" />
                </div>
                <div v-if="tab.title === 'Complete'">
                    <list :tasks="completedTasks" />
                </div>
            </ui-tab>
        </ui-tabs>
        <div class="form">
            <ui-textbox class="input" placeholder="Add new task" v-model="newTaskName" @keydown-enter="addTask"></ui-textbox>
            <ui-button class="btn" color="primary" @click="addTask">Add task</ui-button>
        </div>
    </div>
</template>

<script>
import { UiCheckbox, UITabs } from 'keen-ui';
import list from '../components/list.vue';

export default {
    components: {
        UiCheckbox,
        UITabs: {
            disableRipple: false
        },
        list
    },
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
            type: 'text',
            raised: false,
            fullwidth: false,
            backgroundColor: 'white',
            tabs: [
                {
                    title: 'Pending',
                },
                {
                    title: 'Complete',
                },
            ],
        }
    },

    methods : {
        addTask () {
            if (this.newTaskName !== '') {
                this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = '';
            }                
        },
    },
    computed: {
        textColor() {
            if (this.backgroundColor === 'white') {
                return 'black';
            }
            return 'white';
        },
        textColorActive() {
            if (this.backgroundColor === 'white') {
                return 'primary';
            }
            return 'white';
        },
        indicatorColor() {
            if (this.backgroundColor === 'default') {
                return 'primary';
            }
            return 'white';
        },
        completedTasks() {
            return this.tasks.filter(task => task.complete)
        },
        pendingTasks() {
            return this.tasks.filter(task => !task.complete)
        }
    },
    mounted(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
};
</script>

<style scoped lang="scss">
    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        width: 500px;

        .title {
            margin-top: 0;
        }

        .form {
            display: flex;
            justify-content: space-between;
        }

        .input {
            width: 60%;
        }

        .btn {
            width: 130px;
            border-radius: 30px;
            color: white;
        }
    }

</style>
