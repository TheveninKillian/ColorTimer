<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { useTimeStore } from './stores/time'

const { height } = useWindowSize()

const valueTimerDefault = useTimeStore()

const minute = valueTimerDefault.minute
const second = valueTimerDefault.second
</script>

<template>
  <main :style="{ height: height + 'px' }">
    <header>
      <h1>ColorTimer</h1>

      <div>
        <Icon icon="ci:line-l" />
        <Icon icon="carbon:close" />
      </div>
    </header>

    <Timer :minute="minute" :second="second" :style="{ height: (height - 25) + 'px' }" />
  </main>
</template>

<style>
main{
  width: 100%;

  background-color: #000;
  color: #fff;

  overflow: hidden;
}

header{
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 25px;

  font-size: 18px;

  z-index: 100;
}

header h1{
  margin-left: 25px;
  width: 100%;

  -webkit-app-region: drag;
}

header div{
  display: flex;
  align-items: center;

  margin-right: 25px;
}

header svg{
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  color: #000;
}

header svg:nth-child(1){
  margin-right: 10px;

  transform: rotateZ(90deg)
}

header svg:hover{
  background-color: #000;
  color: #fff;
}
</style>
