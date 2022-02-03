<template>
<!--    <transition name="fade">-->
        <div v-show="isActive">
            <slot></slot>
        </div>
<!--    </transition>-->
</template>

<script>
export default {
    name: "tab",
    props: {
        name: {required: true},
        selected: {default: false}
    },
    data() {
        return {
            isActive: false
        }
    },
    mounted() {
        this.isActive = this.selected
    }
}
</script>

<style scoped>
/*.fade-enter-active, .fade-leave-active {*/
/*    transition: opacity .5s;*/
/*}*/
/*.fade-enter, .fade-leave-to !* .fade-leave-active до версии 2.1.8 *! {*/
/*    opacity: 0;*/
/*}*/
</style>
