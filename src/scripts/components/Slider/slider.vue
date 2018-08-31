<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots" v-if="showDots">
            <span class="dot"
                  :class="{active: currentPageIndex === index }"
                  :key="index"
                  v-for="(item, index) in dots"
                  v-if="dots.length > 1">
            </span>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'Slider',
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            },
            list: {
                type: Array,
                default: null
            },
            showDots: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            list(newVal, oldVal) {
                this.init();
            }
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted() {
            this.init();

            window.addEventListener('resize', () => {
                if (!this.slider || !this.slider.enabled) {
                    return
                }
                clearTimeout(this.resizeTimer)
                this.resizeTimer = setTimeout(() => {
                    if (this.slider.isInTransition) {
                        this._onScrollEnd()
                    } else {
                        if (this.autoPlay) {
                            this._play()
                        }
                    }
                    this.refresh()
                }, 60)
            })
        },
        activated() {
            this.slider.enable()
            let pageIndex = this.slider.getCurrentPage().pageX
            this.slider.goToPage(pageIndex, 0, 0)
            this.currentPageIndex = pageIndex
            if (this.autoPlay) {
                this._play()
            }
        },
        deactivated() {
            this.slider.disable()
            clearTimeout(this.timer)
        },
        beforeDestroy() {
            this.slider.disable()
            clearTimeout(this.timer)
        },
        methods: {
            init() {
                setTimeout(() => {
                    this._setSliderWidth()
                    this._initDots()
                    this._initSlider()

                    if (this.autoPlay) {
                        this._play()
                    }
                }, 20)
            },
            refresh() {
                if (this.slider) {
                    this._setSliderWidth(true)
                    this.slider.refresh()
                }
            },
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children

                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    this._addClass(child, 'slider-item')

                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    mouseWheel: true,
                    click: true,
                    taps: true,
                    preventDefault: false, // 允许界面上的滚动条滚动
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    }
                })

                this.slider.on('scrollEnd', this._onScrollEnd)

                this.slider.on('touchend', () => {
                    if (this.autoPlay) {
                        this._play()
                    }
                })

                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },
            _addClass(el, className) {
                if (this._hasClass(el, className)) {
                    return
                }
                let newClass = el.className.split(' ')
                newClass.push(className)
                el.className = newClass.join(' ')
            },
            _hasClass(el, className) {
                let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
                return reg.test(el.className)
            },
            _onScrollEnd() {
                let pageIndex = this.slider.getCurrentPage().pageX
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                    this._play()
                }
            },
            _initDots() {
                // this.dots = new Array(this.children.length)
                this.dots = []
                this.dots.length = this.children.length
            },
            _play() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.dots.length > 1 && this.slider.next()
                }, this.interval)
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import '~$styles/base/index.styl';
    .slider {
        position: relative;
        overflow: hidden;
        min-height: 1px;
        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            .slider-item {
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
        .dots {
            position: absolute;
            right: 0;
            left: 0;
            bottom: px2rem(20);
            transform: translateZ(1px);
            text-align: right;
            font-size: 0;
            .dot {
                display: inline-block;
                margin: 0 2px;
                width: px2rem(6);
                height: px2rem(6);
                border-radius: 50%;
                background: #fff;
                opacity: 1;
                &.active {
                    opacity: 1;
                    background: #EA444F
                }
                &:last-child {
                    margin-right: px2rem(20);
                }
            }
        }
    }
</style>
