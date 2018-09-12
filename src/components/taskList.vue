<template>
    <ul class="tasks">
        <transition-group name="list">
        <li v-for="task in tasks" :key="task.id" 
        :class="{complete : task.complete}"
        v-if="completed == task.complete "
        >
            <ui-checkbox v-model="task.complete">
                {{task.name}}
            </ui-checkbox>
        </li>
         </transition-group>
    </ul>
</template>
<script>
    export default {
        props: ['tasks', 'completed'],
    }
</script>
<style lang="scss" scoped>

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter{
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
 .is-checked {
    text-decoration: line-through;
}
 .ui-checkbox__label-text{
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break:break-all;
    text-overflow: ellipsis;
}

</style>
