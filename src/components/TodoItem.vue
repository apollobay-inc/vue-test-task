<template>
    <label>
        <ui-checkbox 
            :disabled="task.complete" 
            :value="task.complete" 
            @change="$emit('changeState', $event, task)"
        >
            {{task.name}}
        </ui-checkbox>
    </label>
</template>

<script>
    export default {
        props: {
            task: {
                type: Object,
                default: {
                    complete: false,
                    name: ''
                }
            }
        }
    }
</script>