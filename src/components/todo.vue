<template>
    <main class="todo">
        <h1 class="title">Checklist</h1>
    <div class="task_tabs_wrap">
        <ui-tabs type="icon-and-text" fullwidth>
            <ui-tab title="Pending" icon="layers" >
                <ul class="tasks">
                    <list-item v-for="task in tasks" 
                        :tasks="tasks"
                        :task="task" 
                        :complete="!task.complete">
                    </list-item>
                </ul>
            </ui-tab>
               <ui-tab title="Complete" icon="thumb_up_alt" >
                   <ul class="tasks">
                    <list-item v-for="task in tasks" 
                        :tasks="tasks"
                        :task="task" 
                        :complete="task.complete"
                        >
                    </list-item>
                </ul>
               </ui-tab>
        </ui-tabs>
    </div>  
        <div class="add_task_wrap" @keyup.enter="addTask">
            <ui-textbox class="input"  placeholder="Enter task name" v-model="newTaskName"></ui-textbox>
            <ui-button color="primary" @click="addTask" icon="add">Add</ui-button>
        </div>
    </main>
</template>
 
<script>
    import ListItem from './list-item'

    export default {
        data () {
            return {
                newTaskName : '',
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

        methods : {
            addTask (event) {
                if (this.newTaskName == ""){
                    return;
                }
                this.tasks.push({name : this.newTaskName, complete : false});
                this.newTaskName = "";
                this.updateStorage(this.tasks);
                setTimeout(this.scrollElem,0)
            },
            updateStorage(taskArr){
                localStorage.tasksList = JSON.stringify(taskArr);
                },
             scrollElem(){
                const ul = this.$el.querySelector(".tasks");
                const bottom = ul.scrollHeight;
                ul.scrollTop = bottom;
            }
        },
        components:{
            listItem: ListItem,
        },
         mounted() {
            if(localStorage.tasksList){
                try{
                    let j = JSON.parse(localStorage.tasksList);
                    if(Array.isArray(j)){
                        this.tasks = j;
                    } else {
                        clearStorage();
                    }
                } catch(err) {
                    clearStorage();
                }

                function clearStorage(){
                    localStorage.tasksList = "";
                }
            }
            
            function animation(elem){
                    elem.style.width = "500px";
                    elem.style.height = "600px";
                    elem.style.padding = "20px";
                    elem.style.transform = "rotate(1440deg)"
            }
            const self = this.$el
            setTimeout(animation,0,self)
        },
    };
</script>

<style scoped lang="scss">
    $width:450px;
    $height:450px;

    .todo {
         width: 0px;
         height: 0px;
         padding: 0px;
        overflow:hidden;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        margin: auto;
        background: #fff;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 15px;
        transition: 1.5s;
        transition-timing-function: linear;


        .title {
            margin-top: 0;
            text-align: center;

        }
        .task_tabs_wrap{
            display:flex;
            flex-grow:3;
            height: $height;
            width: $width;
        }

        .tasks {
            list-style: none;
            padding: 0;
            height: $height - 150px;
            overflow:auto;
        }

        .add_task_wrap{
            display:flex;
            justify-content:space-around;
            
            .input{
                flex-grow:2;
                margin-right:20px;
    
            }
        }
    }

</style>
