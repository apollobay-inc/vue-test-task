<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        <ul class="tasks">
            <tabs>
                <tab name="Pending" selected="true">
                    <transition-group name="slide-fade">
                        <li v-for="task in tasks" :key="task.id" @click="hideItem(task.id)" v-show="!task.hide">
                            <label class="label">
                                <input class="hidden-box" type="checkbox" v-bind:value="task"  v-model="completedTasks" checked />
                                <span>{{task.name}}</span>
                            </label>
                        </li>
                    </transition-group>
                </tab>
                <tab name="Completed">
                    <li class="completed-item" v-for="task in completedTasks" :class="{complete : task.complete}">
                        <label>
                            {{task.name}}
                        </label>
                    </li>
                </tab>
            </tabs>
        </ul>
        <div class="form">
            <ui-textbox placeholder="e.g. 'read vue.js guide'" v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask"  icon="add">Add</ui-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Tab from "./tab";
import Tabs from "./tabs";
    export default {
        components: {Tabs, Tab},
        data () {
            return {
                newTaskName : '',
                id: 15,
                tasks: [
                    {id: 1, name : 'create skeleton of todo', complete : true},
                    {id: 2, name : 'add ability to add tasks', complete : true},
                    {id: 3, name : 'clear task name after clicking "Add"', complete : false},
                    {id: 4, name : 'put "Add" button in one line with input', complete : false},
                    {id: 5, name : 'add new task by hitting Enter instead of clicking "Add"', complete : false},
                    {id: 6, name : 'replace <input> with <ui-checkbox> in tasks list', complete : false},
                    {id: 7, name : 'when task is complete cross it out', complete : false},
                    {id: 8, name : 'split tasks into "pending" and "complete" tabs using keen-ui component <ui-tabs>', complete : false},
                    {id: 10, name : 'don\'t allow to add empty tasks', complete : false},
                    {id: 11, name : 'make list of tasks scrollable, if there\'re are a lot of tasks', complete : false},
                    {id: 12, name : 'extract list item into a separate vue.js component', complete : false},
                    {id: 13, name : 'persist tasks list in a local storage', complete : false},
                    {id: 14, name : 'add animation on task completion', complete : false},
                ],
                completedTasks: []
            }
        },
        created(){
            this.tasks.map(item => Vue.set(item, 'hide', false) )
        },

        methods : {
            addTask () {
                this.tasks.push({id: this.id++, name : this.newTaskName, complete : false});
                this.newTaskName = ''
            },
            hideItem (id) {
                this.tasks.forEach(i => i.id === id ? i.hide = true : true)
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
        min-height: 630px;
        min-width: 735px;
        position: relative;
        max-width: 735px;

        .title {
            margin-top: 0;
        }
        .slide-fade-enter-active {
            transition: all 2s ease;
            visibility: visible;
        }
        .slide-fade-leave-active {
            transition: all 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to
            /* .slide-fade-leave-active до версии 2.1.8 */ {
            //transform: translateX(50px);
            opacity: 0;
            visibility: hidden;
        }

        .tasks {
            list-style: none;
            padding: 0;
            .completed-item {
                font-size: 18px;
                padding: 3px 0;
            }
            .label {
                padding: 3px 0;
                display: flex;
                align-items: center;
                input {
                    width: 20px;
                    height: 20px;
                }
                span {
                    position: relative;
                    font-size: 18px;
                    margin-left: 10px;
                    &:after {
                        content: '';
                        display: block;
                        width: 0%;
                        height: 2px;
                        background-color: #000;
                        position: absolute;
                        top: 50%;
                        left: 0%;
                        transform: translateY(-50%);
                        transition: width 100ms ease-in-out;
                    }
                }
                input:checked + span {

                        &:after {
                            width: 100%;
                        }
                }
            }
        }
        .form {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px;
            button {
                max-width: 40px;
            }
        }
    }
</style>
