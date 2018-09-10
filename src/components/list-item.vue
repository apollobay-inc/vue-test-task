<template>
		<li >
			<transition name="fade">
				<ui-checkbox v-show="complete" @change="updateStorage" v-model="task.complete" >{{task.name}}</ui-checkbox>
	  	</transition>
	 </li>
</template>
<script>
    export default {
    	props: ["tasks",'task', "complete"],
        data () {
            return {
            }
        },

        methods : {
        	updateStorage(){
        		localStorage.tasksList = JSON.stringify(this.tasks);
        	}
        }
    };
</script>
<style  scoped lang="scss">
	.fade-leave-active{
		 opacity: 0;
     transition: opacity 0.6s;
     text-decoration: line-through;
	}
</style>  