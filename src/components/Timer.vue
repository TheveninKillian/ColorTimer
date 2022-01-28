<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

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
  <div class="timer" :style="{ height: height + 'px' }">
    <div class="timer__value" :style="{ fontSize: (width * 0.35) + 'px' }">
      <span class="timer__minute">
        <div>
          <span v-if="minute < 10">0</span>
          <span>{{ minute }}</span>
        </div>
      </span>

      <span class="timer__point">:</span>

      <span class="timer__second">
        <div>
          <span v-if="second < 10">0</span>
          <span>{{ second }}</span>
        </div>
      </span>

      <span class="timer__point">.</span>

      <span class="timer__millisecond">
        <div>
          <span v-if="millisecond < 10">0</span>
          <span>{{ millisecond }}</span>
        </div>
      </span>
    </div>

    <div class="timer__btn">
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

  margin-bottom: 25px;
  width: 100%;

  background-color: #000;
  color: #fff;

  overflow: hidden;
}

.timer__value span{
  display: inline-block;
}

.timer__value .timer__minute,
.timer__value .timer__second,
.timer__value .timer__millisecond{
  width: calc(90% / 3);
}

.timer__value .timer__point{
  width: calc((100% - 90% ) / 2);

  text-align: center;
}

.timer__value .timer__minute{
  text-align: right;
}

.timer__value .timer__second{
  text-align: center;
}

.timer .timer__btn{
  position: absolute;
  bottom: 50px;
  left: 50%;
}
</style>
