<template>
    <div class="input-flex">
        <input class="input" type="text" placeholder="Add a new item here" v-model="newTask" @keyup.enter="addNewTask">
        <ui-button @click.native="addNewTask"></ui-button>
    </div>

</template>

<script>
import uiButton from './ui-button';

export default {
    name       : 'ui-input',
    components : {uiButton},
    data () {
        return {
            newTask : ''
        };
    },
    methods : {
        addNewTask () {
            this.$emit('changeTitleEvent', this.newTask);
            this.newTask = '';
        }

    }

};

</script>

<style scoped>
.input-flex {
display: flex;
}

.input {
    border: none;
    outline: none;
    caret-color: plum;
}


</style>
