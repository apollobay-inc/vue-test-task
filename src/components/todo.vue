<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ui-tabs type="text" backgroundColor="clear">
            <ui-tab title="Pending">
                <ul class="tasks">
                    <app-listItem :tasks=this.tasks :taskComplete=false></app-listItem>
                </ul>
            </ui-tab>
            <ui-tab title="Complete">
                <ul class="tasks">
                    <app-listItem :tasks=this.tasks :taskComplete=true></app-listItem>
                </ul>
            </ui-tab>
        </ui-tabs>
        <div class="footer">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName" class = "taskInput" v-on:keyup.enter.native="addTask"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
    import listItem from './listItem'

    export default {

        data () {
            return {
                newTaskName : '',
                tasks: []
            }
        },

        components: {
            'app-listItem': listItem
        },

        mounted() {
            if (localStorage.getItem('tasks')) {
                try {
                    this.tasks = JSON.parse(localStorage.getItem('tasks'));
                } catch(e) {
                    localStorage.removeItem('tasks');
                }
            }
        },

        methods : {
            addTask () { 
                var newTaskName = this.newTaskName.trim();
                if (newTaskName =="") {
                    return
                }

                this.tasks.push({name : newTaskName, complete : false});
                this.newTaskName = "";
                this.saveTasks();
            },
            saveTasks() {
                const parsed = JSON.stringify(this.tasks);
                localStorage.setItem('tasks', parsed);
            }
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

        .title {
            margin-top: 0;
        }

        .tasks {
            list-style: none;
            padding: 0;
            height: 400px;
            width: 400px;
            overflow: auto;
        }

        .footer {
            display: flex;

            .taskInput {
                flex-grow: 1;
                padding-right:10px;
            }
        }
    }
</style>
