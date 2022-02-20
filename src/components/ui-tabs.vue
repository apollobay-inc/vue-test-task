<template>
    <div>
        <div class="filter">
            <div v-on:click="pendingTask" :class="{selected:this.filters.pendingSelected}">Pending</div>
            <div v-on:click="completedTask" :class="{selected:this.filters.completeSelected}">Completed</div>
        </div>
    </div>
</template>

<script>
export default {
    name  : 'ui-tabs',
    data () {
        return {
            filters:{
                pendingSelected: false,
                completeSelected: false
            },
        };
    },
    methods  : {
        pendingTask () {
            this.$emit('taskEvent', 'pending');
            this.filters.pendingSelected = true
            this.filters.completeSelected = false
        },
        completedTask () {
            this.$emit('taskEvent', 'complete');
            this.filters.pendingSelected = false
            this.filters.completeSelected = true
        }
    }
};
</script>

<style scoped lang="scss">
.filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
    width: 80px;
    height: 40px;
    border: 1px solid white;

}

.selected {
    background: lightgray;
    border: 2px solid lightgray;
    border-radius: 30%;
    color: white;
}




</style>
