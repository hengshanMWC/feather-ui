<template>
  <div class="pop-up">
    <transition name="fade">
      <div class="night" v-show="show" @click="handleHide" @touchmove.prevent></div>
    </transition>
    <transition :name="position">
      <div ref="pop" v-show="show" :class="position" class="slot-container">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: 'popUp',
  props: {
    show: Boolean,
    position: {
      type: String,
      default: 'center' // center, top, right, bottom, left
    }
  },
  setup (props, { emit }) {
    function handleHide () {
      emit('update:show', false)
      emit('hide', false)
    }
    return {
      handleHide,
      ...toRefs(props)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'move';
.location-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.layer {
  position: fixed;
  z-index: 100;
}
.pop-up {
  position: absolute;
  top: 0;
  .night {
    @extend .layer;
    @extend .location-0;
    background-color: rgba(0,0,0,.8);
  }
  .slot-container {
    @extend .layer;
  }
  .center {
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
  }
  .top {
    top: 0;
    left: 0;
  }
  .right {
    top: 0;
    right: 0
  }
  .bottom {
    bottom: 0;
    left: 0;
  }
  .left {
    top: 0;
    left: 0;
  }
}
</style>
