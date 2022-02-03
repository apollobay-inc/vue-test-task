<template>
    <div class="tabs">
        <ul>
            <li v-for="(tab, index) in tabs" :key="index">
                <div :class="{'is-active': tab.isActive}" @click="selectTab(tab)">
                    {{tab.name}}
                </div>
            </li>
        </ul>
        <section>
            <slot></slot>
        </section>
    </div>
</template>

<script>
export default {
name: "tabs",
    data () {
        return {
            tabs: []
        }
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = tab.name === selectedTab.name
            })
        }
    },
    created() {
        this.tabs = this.$children
    }
}
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    flex-direction: column;
    margin-bottom: 90px;
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin-bottom: 20px;
        li {
            margin: 0 15px;
            display: flex;
            align-items: center;
            &:first-child {
                margin-left: 0;
            }
            div {
                cursor: pointer;
                transition: all .2s;
                &:hover {
                    color: #ababab;
                }
                &.is-active {
                    background: #ababab;
                    color: #fff;
                    padding: 10px 20px;
                    border-radius: 20px;
                }
            }
        }
    }
    span {
        background: #a5a3a3;
        border-radius: 20px;
        color: #fff;
        padding: 10px 20px;
        cursor: pointer;
    }
}
</style>
