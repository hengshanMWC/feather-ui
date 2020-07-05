<template>
  <div class="timing">
    <slot :time="time"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, computed, onUnmounted } from 'vue'
import { NAME } from '@/constant'
export default defineComponent({
  name: 'timing',
  props: {
    seconds: {
      type: Number,
      default: 60
    },
    isCache: Boolean,
    cacheObject: {
      type: Object,
      default: () => localStorage
    },
    cacheID: {
      validator: () => true,
      default: 0,
    },
  },
  setup (props) {
    // 缓存
    const key = computed(() => `${NAME}_timing_${props.cacheID}`)
    function getCache (): number {
      const time = Number(props.cacheObject.getItem(key.value)) - Date.now()
      return time > 0 ? time / 1000 : 0
    }
    function setCache (seconds: number) {
      const time = seconds * 1000 + Date.now()
      props.cacheObject.setItem(key.value, time.toString())
    }
    // 定时器
    const time = ref(0)
    let timer: NodeJS.Timeout
    function startTime () {
      timer = setTimeout(() => {
        if (time.value <= 0) {
          clearTimeout(timer)
        } else {
          setCache(--time.value)
          startTime()
        }
      }, 1000)
    }
    onUnmounted(() => {
      clearTimeout(timer)
    })
    // 启动
    const loading = ref<Boolean>(false)
    async function start (cd: Function): Promise<undefined | number> {
      if (time.value === 0 && !loading.value) {
        loading.value = true
        const b: boolean = await cd()
        if (b) {
          time.value = props.seconds
          setCache(time.value)
          startTime()
        }
        loading.value = false
      } else {
        return time.value
      }
    }
    // 初始化
    (function cacheExtract () {
      if (props.isCache) {
        time.value = Math.round(getCache())
        startTime()
      }
      props.cacheObject.removeItem(key.value)
    })()
    return {
      start,
      startTime,
      time
    }
    
  }
})
</script>