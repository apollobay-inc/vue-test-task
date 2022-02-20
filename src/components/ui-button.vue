<template>
    <div class="flex">
        <button type="button" class="add-button">Add item</button>
    </div>
</template>

<script>
export default {
    name : 'ui-button'
};
</script>

<style scoped>
.flex {
    padding: 0 0 0 200px;

}

.add-button {
    width: 80px;
    height: 40px;
    background: dodgerblue;
    border: 1px solid white;
    border-radius: 30%;
    color: white;
    font-size: 15px;
    cursor: none;
}

</style>
