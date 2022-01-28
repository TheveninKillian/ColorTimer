<script lang="ts" setup>
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
</script>

<template>
  <div class="timer">
    <span class="timer__minute"><span v-if="minute < 10">0</span>{{ minute }}:</span>
    <span class="timer__second"><span v-if="second < 10">0</span>{{ second }}.</span>
    <span class="timer__millisecond"><span v-if="millisecond < 10">0</span>{{ millisecond }}</span>
  </div>

  <div>
    <button :disabled="!initPlay" @click="reset()">
      Reset
    </button>

    <button :disabled="initPlay" @click="play()">
      Play
    </button>
  </div>
</template>

<style>
.timer{
  margin-bottom: 25px;

  font-size: 25px;
}
</style>
