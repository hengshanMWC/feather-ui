<template>
  <div class="pop-up">
    <transition name="fade">
      <div class="night" v-show="show" @click="$emit('hide', false)" @touchmove.prevent></div>
    </transition>
    <transition :name="position">
      <div ref="pop" v-show="show" :class="position" class="slot-container">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default {
  name: 'popUp',
  data () {
    return {
      onceActivated: true
    }
  },
  props: {
    show: Boolean,
    position: {
      type: String,
      default: 'center' // bottom
    }
  },
  model: {
    prop: 'show',
    event: 'hide'
  }
}
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
    right: 0
  }
  .bottom {
    bottom: 0;
    left: 0;
  }
  .left {
    left: 0;
  }
}
</style>
