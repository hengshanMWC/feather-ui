import { ref } from 'vue'
// 操作展开&收起
export function useToggle () {
  const isMoreRef = ref<boolean>(false)
  function toggle () {
    isMoreRef.value = !isMoreRef.value
  }
  return {
    isMoreRef,
    toggle
  }
}
// 操作dom
export function useSetDom () {
  // 内容高度小于收起高度,隐藏掉收起&展开
  const isRef = ref(true)
  const contentRef = ref<any>(null)
  const moreBoxRef = ref<any>(null)
  function needMore () {
    const contentHeight = contentRef.value.getBoundingClientRect().height
    const moreHeight = moreBoxRef.value.getBoundingClientRect().height
    isRef.value = contentHeight > moreHeight
  }
  // 收起的height
  const noMoreHeightRef = ref<string>('0')
  const moreSlotRef = ref<any>(0)
  function setMarginTop () {
    if (isRef) {
      noMoreHeightRef.value = moreSlotRef.value.getBoundingClientRect().height
    }
  }
  // max-height
  const maxHeightRef = ref<string>('0')
  function setHeight () {
    if (isRef) {
      maxHeightRef.value = contentRef.value.getBoundingClientRect().height + 'px'
    }
  }
  return {
    isRef,
    contentRef,
    moreBoxRef,
    needMore,
    noMoreHeightRef,
    moreSlotRef,
    setMarginTop,
    maxHeightRef,
    setHeight
  }
}