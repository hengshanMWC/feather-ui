<template>
  <more pack-height="5vh" more-height="20vh">
    <template v-slot:content>
      <div class="content">按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的
        按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的
        按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的
        按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的按时打算打算大是打萨达是啊实打实的阿萨德啊实打实的啊实打实的
      </div>
    </template>
    <template v-slot:pack>
      <span>收起</span>
    </template>
    <template v-slot:more>
      <span>展开</span>
    </template>
  </more>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import More from './packages/More/index.vue'
export default defineComponent ({
  components: {More},
  setup (props, content) {
    const centerShow = ref<boolean>(false)
    return {
      centerShow
    }
  }
})
</script>

<style scoped>
.content {
  height: 150px;
  overflow-y: auto;
}
</style>
