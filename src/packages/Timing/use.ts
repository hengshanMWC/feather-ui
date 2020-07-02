import { ref } from 'vue'

const loading = ref<Boolean>(false)
export const time = ref(0)
export let timer: NodeJS.Timeout
export function getCache (key: any): number {
  const time = Number(localStorage.getItem(key)) - Date.now()
  return time > 0 ? time / 1000 : 0
}
export function setCache (seconds: number, key: any) {
  const time = seconds * 1000 + Date.now()
  localStorage.setItem(key, time.toString())
}
export async function start (cd: Function, seconds: number, key: any): Promise<undefined | number> {
  if (time.value === 0 && !loading.value) {
    loading.value = true
    const b: boolean = await cd()
    if (b) {
      time.value = seconds
      setCache(time.value, key)
      startTime(key)
    }
    loading.value = false
  } else {
    return time.value
  }
}
export function startTime (key: any) {
  timer = setTimeout(() => {
    if (--time.value <= 0) {
      clearTimeout(timer)
    } else {
      setCache(time.value, key)
      startTime(key)
    }
  }, 1000)
}