<template>
    <div class="todo">
        <h1 class="title">Checklist</h1>
        
        <router-link class="link"
            v-for="(item, index) in routs" 
            :key="index" 
            :to="'/' + item"
            active-class="link-active">{{ item }}
        </router-link>

        <router-view></router-view>
        
        <div class="control-block">
            <ui-textbox 
                placeholder="e.g. 'read vue.js guide'"  
                @keyup.enter.native="addTask()" 
                v-model.trim="newTaskName">
            </ui-textbox>

            <ui-button 
                color="primary" 
                @click="addTask()" 
                icon="add">Add
            </ui-button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Pending from './Pending/Pending.vue'
import Completed from './Completed/Completed.vue'

    export default {
        data() {
            return {
                newTaskName : '',
                routs: ['pending', 'completed']
            }
        },
        methods : {
            addTask() {
                return this.newTaskName.length !== 0 ? (this.$store.commit('addTask', {name : this.newTaskName, complete : false}), this.newTaskName = '') : null                
            }
        },
        components: {
            Pending,
            Completed
        }

    }
</script>

<style lang="scss">
    .complete {
        text-decoration: line-through;
    }

    .todo {
        margin: auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;

        .title {
            margin-top: 0;
        }

        .link {
            font-weight: 700;
            color: #000;
            text-decoration: none;
            text-transform: capitalize;
            padding: 10px;

            &-active {
                background-color: #eee;
            }
        }

        .tasks {
            list-style: none;
            padding: 0;

            .task {
                display: flex;

                &-text {
                    display: inline-block;
                    margin-left: 20px;
                }
            }
        }

        .control-block {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
