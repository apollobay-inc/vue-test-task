<template>
    <div>
        <ul class="tasks">
            <transition-group tag="li" name="slide">
            <li v-for="(task, index) in tasks" :class="{complete : task.complete, done: task.complete, checked: task.complete }" :key="index" >
                <label>
                    <input class="check"  type="checkbox" v-model="task.complete"/>
                    {{task.name}}
                </label>
            </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
export default {
    name : 'ui-textbox',
    props: {
        tasks: {
            name: String,
            complete : Boolean
        }
    },
    data() {
        return {
            done: true
        }
    }
};
</script>

<style scoped lang="scss">
.tasks {
    width: 300px;
    height: 200px;
    list-style: none;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
}

.done {
    text-decoration: line-through;
}
.slide-enter-active {
    transition: all .1s ease;
}
.slide-leave-active {
    transition: all 0.2ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
}

.check {
    visibility: hidden;
    appearance: none;
}

.checked::before {
    content: "✔";
}

</style>
