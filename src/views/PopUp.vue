<template>
  <div>
    <button @click="centerShow = true">center弹窗</button>
    <popUp v-model:show="centerShow" position="left">
      <div class="pop-center">
        center
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
    return {
      centerShow
    }
  }
})
</script>

<style scoped>
button {
  padding: 5px 20px;
}
.pop-center {
  width: 90vw;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
</style>
