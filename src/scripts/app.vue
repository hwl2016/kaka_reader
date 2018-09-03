<template>
    <div id="wrapper">
        <transition name="slide-right" mode="out-in">
            <router-view class="container"></router-view>
        </transition>
    </div> 
</template>
<script>
    export default {
        data() {
            return {
                transitionName: 'slide-right',
            }
        },
        watch: {
            $route(to, from) {
                if (from.meta.noAnimate === true || (!this.$router.isBack && to.meta.isEnter === true)) {
                    this.transitionName = '';
                    this.childTransitionName = '';
                    return;
                }
                if (this.$router.isReplace) {
                    this.transitionName = '';
                    this.$router.isReplace = null;
                } else {
                    this.transitionName = this.$router.isBack ? 'slide-left' : 'slide-right';
                    this.childTransitionName = 'slide-right-left';
                    this.$router.isBack = null;
                }
            }
        }
    }
</script>
<style lang="stylus">

</style>