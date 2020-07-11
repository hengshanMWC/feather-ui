<template>
  <div ref="scope" :style="{height}" class="scope-box">
    <div :style="{position}" class="scope">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scope',
  data () {
    return {
      position: 'static',
      scope: null, // dom
      handleScroll: null, // 函数
      height: 'auto', // 占位置
      value: 0 // 固定的阈值
    }
  },
  props: {
    direction: {
      type: String,
      default: 'Top'
    },
    scopeValue: Number // 固定的阈值
  },
  watch: {
    scopeValue: {
      handler (val) {
        this.value = val
        this._handleScroll()
      },
      immediate: true
    }
  },
  created () {
    this.handleScroll = this._handleScroll.bind(this)
  },
  mounted () {
    this.$time = setTimeout(() => {
      this.scope = this.$refs.scope
      this.value = this.getElementOffset(this.scope)
      this.height = this.scope.offsetHeight + 'px'
      addEventListener('scroll', this.handleScroll)
    }, 200)
  },
  beforeDestroy () {
    clearTimeout(this.$time)
    removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    _handleScroll () {
      let scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (scrollTop - this.value >= 0) {
        this.setPosition('fixed')
      } else {
        this.setPosition('static')
      }
    },
    getElementOffset (el) {
      if (el.parentElement) {
        return this.getElementOffset(el.parentElement) + el['offset' + this.direction]
      }
      return el['offset' + this.direction]
    },
    setPosition (position) {
      if (this.position === position) return
      this.position = position
      this.$emit(position, this.height, this.$slots.default.elm)
    }
  }
}
</script>

<style lang="scss" scoped>
.scope-box {
  .scope{
    z-index: 1;
    top: 0;
  }
}
</style>