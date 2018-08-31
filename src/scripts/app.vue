<template>
    <div id="wrapper">
        <router-view class="container"></router-view>
    </div> 
</template>
<script>
    export default {
        data() {
            return {
                transitionName: 'slide-right',
            }
        }
    }
</script>
<style lang="stylus">

</style>