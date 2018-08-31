<template>
    <header class="ui-header">
        <div class="item logo">卡卡小说网</div>
        <div class="item gender">
            <span :class="{active: isMale}" @click="changeGender">男生</span>
            <span :class="{active: !isMale}" @click="changeGender">女生</span>
        </div>
        <div class="item user">
            <span class="iconfont">&#xe658;</span>
        </div>
    </header>
</template>
<script>
    export default {
        props: {
            isFixed: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isMale: true
            }
        },
        created() {
            let query = this.$route.query || {}
            this.isMale = query.gender === 'female' ? false : true
        },
        mounted() {
            if(this.isFixed) {
                document.querySelector('.container').classList.add('child-view')
            }
        },
        methods: {
            changeGender() {
                this.isMale = !this.isMale
            }
        }
    }
</script>
<style lang="stylus">
@import "~$styles/base/index.styl"

$color = #EA444F

.ui-header
    height px2rem($header-height)
    line-height px2rem($header-height)
    padding 0 px2rem(10)
    background #fff
    width 100%
    position fixed
    top: 0
    left 0
    right 0
    .item
        float left
        height 100%
        text-align center
    .logo
        width 25%
        text-align left 
    .gender
        width 50%
        span 
            width px2rem(50)
            border 1px solid $color
            border-radius 4px
            padding 0 px2rem(5)
            &.active
                background-color $color
                color #fff
    .user
        width 25%
        text-align right 
        .iconfont
            color $color
            font-size px2rem(16)
</style>