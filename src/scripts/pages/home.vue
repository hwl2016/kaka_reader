<template>
    <div class="home">
        <Header></Header>
        <div class="content">
            <div class="slider-wrapper">
                <Slider :list="banners">
                    <div v-for="item in banners" :key="item.id">
                        <a :href="item.url">
                            <img :src="item.img" alt="">
                        </a>
                    </div>
                </Slider>
            </div>
            <div class="search-wrapper">
                <div class="search">
                    <span class="iconfont">&#xe62b;</span>
                    <span>搜索</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Header, Slider } from '$comp/index'
    export default {
        data() {
            return {
                banners: [
                    {
                        id: 1,
                        url: 'https://baidu.com',
                        img: '//qidian.qpic.cn/qidian_common/349573/514c0b814c006a732b898ad2fc5730c3/0'
                    },
                    {
                        id: 2,
                        url: 'https://baidu.com',
                        img: '//qidian.qpic.cn/qidian_common/349573/a8820a8b124ef2602d95fc27bbac84d8/0'
                    },
                    {
                        id: 3,
                        url: 'https://baidu.com',
                        img: '//qidian.qpic.cn/qidian_common/349573/2ccf99e436ffb686f509abe42edec085/0'
                    }
                ]
            }
        },
        components: {
            Header, Slider
        },
        created() {},
        mounted() {},
        methods: {

        }
    }
</script>