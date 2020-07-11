import { computed, onMounted } from 'vue'
import { NAME } from '@/constant'
onMounted(() => console.log(1))
export function useCache (cacheID: any, cacheObject: any) {
  const keyRef = computed(() => `${NAME}_timing_${cacheID}`)
  return {
    getCache (): number {
      const time = Number(cacheObject.getItem(keyRef.value)) - Date.now()
      return time > 0 ? time / 1000 : 0
    },
    setCache (seconds: number) {
      const time = seconds * 1000 + Date.now()
      cacheObject.setItem(keyRef.value, time.toString())
    },
    removeCache () {
      cacheObject.removeItem(keyRef.value)
    }
  }
}