<template>
  <div>
    <button @click="centerShow = true">center弹窗</button>
    <button @click="topShow = true">top弹窗</button>
    <button @click="rightShow = true">right弹窗</button>
    <button @click="bottomShow = true">bottom弹窗</button>
    <button @click="leftShow = true">left弹窗</button>
    <popUp v-model:show="centerShow" position="center">
      <div class="pop-center">
        center
      </div>
    </popUp>
    <popUp v-model:show="topShow" position="top">
      <div class="pop-top">
        top
      </div>
    </popUp>
    <popUp v-model:show="rightShow" position="right">
      <div class="pop-right">
        right
      </div>
    </popUp>
    <popUp v-model:show="bottomShow" position="bottom">
      <div class="pop-bottom">
        bottom
      </div>
    </popUp>
    <popUp v-model:show="leftShow" position="left">
      <div class="pop-left">
        left
      </div>
    </popUp>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PopUp from './packages/PopUp/index.vue'
export default defineComponent ({
  components: {PopUp},
  setup (props, content) {
    const centerShow = ref<boolean>(false)
    const topShow = ref<boolean>(false)
    const rightShow = ref<boolean>(false)
    const bottomShow = ref<boolean>(false)
    const leftShow = ref<boolean>(false)
    return {
      centerShow,
      topShow,
      rightShow,
      bottomShow,
      leftShow
    }
  }
})
</script>

<style scoped>
button {
  padding: 5px 20px;
}
[class*='pop'] {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-size: 50px;
}
.pop-center {
  width: 90vw;
  height: 200px;
}
.pop-bottom,
.pop-top {
  height: 400px;
  width: 100vw;
}
.pop-left,
.pop-right {
  width: 80vw;
  height: 100vh;
}
</style>
