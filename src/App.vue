<script lang="ts" setup>
import { useTimeStore } from './stores/time'

const valueTimerDefault = useTimeStore()

const minute = valueTimerDefault.minute
const second = valueTimerDefault.second
</script>

<template>
  <main>
    <Timer :minute="minute" :second="second" />
  </main>
</template>
