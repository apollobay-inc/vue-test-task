<template>
    <div>
        <li
            v-for="task in tasks"
            :class="['task', {complete : task.complete}]"
            :key="task.id"
        >
            <label>
                <ui-checkbox
                    class="checkbox"
                    type="checkbox"
                    v-model="task.complete"
                />
                {{task.name}}
            </label>
        </li>
    </div>
</template>
<script>
export default {
    props: {
        tasks: {
            type: Array,
            required: true
        }
    }
}
</script>
