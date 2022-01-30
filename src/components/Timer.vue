<script lang="ts" setup>
import { useElementSize } from '@vueuse/core'

const el = ref(null)
const { width } = useElementSize(el)

const props = defineProps<{
  minute: number
  second: number
}>()

const minute = ref(props.minute)
const minuteDefault = minute.value

const second = ref(props.second)
const secondDefault = second.value

const millisecond = ref(0)
const initPlay = ref(false)

let Iinterval = null

if (millisecond.value === 0 && second.value === 0 && minute.value === 0) initPlay.value = true

const play = () => {
  initPlay.value = true

  Iinterval = setInterval(() => {
    if (millisecond.value !== 0) {
      millisecond.value--
    }
    else if (millisecond.value === 0 && second.value !== 0) {
      second.value--
      millisecond.value = 99
    }
    else if (millisecond.value === 0 && second.value === 0 && minute.value !== 0) {
      minute.value--
      second.value = 59
      millisecond.value = 99
    }
    else {
      clearInterval(Iinterval)
    }
  }, 10)
}

const reset = () => {
  initPlay.value = false

  clearInterval(Iinterval)

  second.value = secondDefault
  minute.value = minuteDefault
  millisecond.value = 0
}

const pressKeyboard = (e) => {
  if (initPlay.value === false) {
    if (e.key === 's')
      play()
  }
  else {
    if (e.key === 'r')
      reset()
  }
}

onMounted(() => {
  window.addEventListener('keypress', e => pressKeyboard(e))
})

onUnmounted(() => {
  window.removeEventListener('keypress', e => pressKeyboard(e))
})
</script>

<template>
  <div class="timer">
    <div ref="el" class="timer__value" :style="{ fontSize: (width * .39) + 'px'}">
      <span class="timer__minute">
        <span v-if="minute < 10">0</span>
        <span>{{ minute }}</span>
      </span>

      <span class="timer__point">:</span>

      <span class="timer__second">
        <span v-if="second < 10">0</span>
        <span>{{ second }}</span>
      </span>

      <span class="timer__point">.</span>

      <span class="timer__millisecond">
        <span v-if="millisecond < 10">0</span>
        <span>{{ millisecond }}</span>
      </span>
    </div>

    <div v-if="width > 600" class="timer__btn">
      <button :disabled="!initPlay" @click="reset()">
        Reset
      </button>

      <button :disabled="initPlay" @click="play()">
        Play
      </button>
    </div>
  </div>
</template>

<style>
.timer{
  position: relative;

  display: flex;
  align-items: center;

  margin-bottom: 25px;
  width: 100%;

  z-index: 0;
}

.timer__value{
  width: calc(100% - 100px);
  margin: auto;
}

.timer__btn{
  position: absolute;
  bottom: 0;
  left: 0;

  height: 25px;
  width: 100%;

  text-align: center;
}
</style>
