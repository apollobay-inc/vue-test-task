<template>
    <div id="app">
        <div class="todo">
            <h1 class="title">Checklist</h1>
            <div>
                <custom-cursor
                    :targets="['todo', 'input', 'button', 'add-button']"
                    :circleColor="'#FFC0CB'"
                    :circleColorHover="'#FFC0CB'"
                    :dotColor="'#FFC0CB'"
                    :dotColorHover="'lightgray'"
                    :hoverSize="1"
                > </custom-cursor>
                <ui-tabs v-on:taskEvent="task($event)"></ui-tabs>
                <ui-textbox :tasks="filtered"></ui-textbox>
                <ui-input :tasks="tasks" v-on:changeTitleEvent="addTask($event)"></ui-input>
            </div>
        </div>
    </div>
</template>

<script>
import customCursor from './components/custom-cursor';
import uiTabs from './components/ui-tabs';
import uiTextbox from './components/ui-textbox';
import uiInput from './components/ui-input';

export default {
    name       : 'app',
    components : {customCursor ,uiTabs, uiTextbox, uiInput},
    data () {
        return {
            newTaskName : '',
            tasks       :  this.loadTask(),
            filter      : 'all',
        };
    },

    computed : {
        filtered () {
            return this.filteredTodos();
        }
    },

    methods : {
        loadTask () {
            let result = JSON.parse(localStorage.getItem('todo'));
            return result != null ? result : [];
        },
        addTask (updatedTitle) {
            if (updatedTitle === '') {
                return;
            }
            this.tasks.push({name : updatedTitle, complete : false});
            this.filter = 'all';
            localStorage.setItem('todo', JSON.stringify(this.tasks));
            localStorage.clear()
        },
        task (event) {
            if (event === 'complete') {
                this.filter = 'complete';
            }
            if (event === 'pending') {
                this.filter = 'pending';
            }
        },

        filteredTodos () {
            return this.tasks.filter(task => {
                if (this.filter === 'pending') {
                    return !task.complete;

                } else if (this.filter === 'complete') {
                    return task.complete;
                } else {
                    return true;
                }
            });
        }
    }
};
</script>

<style lang="scss">
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: #eee;
    cursor: none;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    display: flex;

}

// keen ui reset
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
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

}
</style>
