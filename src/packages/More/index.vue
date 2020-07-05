<template>
  <div class="more">
    <div class="more-box" ref="moreBoxRef" :class="{'more-true': isMoreRef, 'more-false': !isMoreRef}" :style="{maxHeight: isMoreRef ? maxHeightRef : packHeight}">
      <div ref="contentRef">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="operation" @click="toggle" v-if="isRef">
      <div v-show="isMoreRef" class="btn-more">
        <slot name="pack">收起</slot>
      </div>
      <div v-show="!isMoreRef" class="btn-no-more" :style="{marginTop: `-${noMoreHeightRef}px`}" ref="moreSlotRef">
        <slot name="more">展开</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue'
import { useToggle, useSetDom } from './use'
export default defineComponent({
  props: {
    packHeight: String,
    moreHeight: String
  },
  setup (props) {
    const {
      isMoreRef,
      toggle
    } = useToggle()
    const {
      isRef,
      contentRef,
      moreBoxRef,
      needMore,
      noMoreHeightRef,
      moreSlotRef,
      setMarginTop,
      maxHeightRef,
      setHeight
    } = useSetDom()
    onMounted(() => {
      watch(() => props.packHeight, function () {
        needMore()
        setMarginTop()
      }, {
        immediate: true
      })
      setHeight()
    })
    return {
      isRef,
      contentRef,
      moreBoxRef,
      isMoreRef,
      noMoreHeightRef,
      moreSlotRef,
      maxHeightRef,
      toggle,
      needMore,
      setMarginTop,
      setHeight
    }
  }
})
</script>

<style lang="scss" scoped>
.more {
  .more-box {
    &.more-false {
      overflow-y: hidden;
    }
    &.more-true {
      overflow-y: auto;
    }
    position: relative;
    transition: max-height 0.2s linear;
  }
  .operation {
    z-index: 2;
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    .btn-more,
    .btn-no-more {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-no-more {
      background: linear-gradient(rgba(255,255,255,1), rgba(255,255,255,.9))
    }
    .btn-more {
      margin-top: 10px;
    }
  }
}
</style>
