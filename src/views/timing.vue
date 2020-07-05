<template>
  <div>
    <input type="tel" placeholder="请输入手机号" v-model="phone" maxlength="11">
    <timing ref="timingRef" v-slot="slotProps" :seconds="10" @loading="handleLoading">
      <button @click="handleVerify">{{slotProps.time ? slotProps.time : '获取验证码'}}</button>
    </timing>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import timing from './packages/timing/index.vue'
import { wait } from '@/utils/common'
export default defineComponent ({
  components: {timing},
  setup (props, content) {
    const timingRef = ref<any>(null)
    const phone = ref<string>('')
    function handleVerify () {
      if (phone.value.length === 11) {
        timingRef.value.handleClick(() => getYZM())
      } else {
        alert('请输入正确的手机号码')
      }
    }
    async function getYZM () {
      await wait(1000)
      alert('发送成功')
      return true
    }
    function handleLoading (time: string) {
      console.log('loading' + time)
    }
    return {
      handleVerify,
      getYZM,
      handleLoading,
      timingRef,
      phone
    }
  }
})
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
