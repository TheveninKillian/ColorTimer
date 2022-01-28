import { acceptHMRUpdate, defineStore } from 'pinia'

export const useTimeStore = defineStore('time', {
  state: () => ({
    minute: 25,
    second: 0,
  }),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTimeStore, import.meta.hot))
