<template>
  <div id="app" @click="handleUserInteraction">
    <button 
      v-if="userInteracted" 
      class="mute-button" 
      @click.stop="toggleMute"
      aria-label="Toggle music"
    >
      <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
    </button>

    <RouterView v-slot="{ Component }">
      <transition name="scroll-up" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { useAudio } from './composables/useAudio'

export default {
  name: 'App',
  components: {
    RouterView
  },
  setup() {
    const { 
      isMuted, 
      userInteracted, 
      toggleMute, 
      handleUserInteraction 
    } = useAudio()

    return {
      isMuted,
      userInteracted,
      toggleMute,
      handleUserInteraction
    }
  }
}
</script>

<style scoped>
.mute-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  z-index: 1000;
  transition: background 0.3s ease;
}

.mute-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.scroll-up-enter-active,
.scroll-up-leave-active {
  transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
}

.scroll-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.scroll-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>