<template>
  <div class="timing">
    <slot :time="timeRef"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, computed, onUnmounted } from 'vue'
import { useCache } from './use'
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
    const {
      getCache,
      setCache,
      removeCache
    } = useCache(props.cacheID, props.cacheObject)
    // 定时器
    const timeRef = ref(0)
    let timer: NodeJS.Timeout
    function startTime () {
      timer = setTimeout(() => {
        if (timeRef.value <= 0) {
          removeCache()
          clearTimeout(timer)
        } else {
          setCache(--timeRef.value)
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
      if (timeRef.value === 0 && !loading.value) {
        loading.value = true
        const b: boolean = await cd()
        if (b) {
          timeRef.value = props.seconds
          setCache(timeRef.value)
          startTime()
        }
        loading.value = false
      } else {
        return timeRef.value
      }
    }
    // 初始化
    (function () {
      if (props.isCache) {
        timeRef.value = Math.round(getCache())
        startTime()
      }
      removeCache()
    })()
    return {
      start,
      startTime,
      timeRef
    }
  }
})
</script>