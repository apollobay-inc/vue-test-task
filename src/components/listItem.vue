<template>
    <li :class="{complete : task.complete}">
        <ui-checkbox v-model="task.complete">{{ task.name }}</ui-checkbox>
    </li>
</template>

<script>
export default {
    props: ['task'],
};
</script>

<style scoped lang="scss">

</style>
