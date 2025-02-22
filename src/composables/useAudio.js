import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useAudio() {
  const bgMusic = ref(null)
  const isMuted = ref(localStorage.getItem('isMuted') === 'true')
  const isPlaying = ref(false)
  const userInteracted = ref(false)

  const initMusic = () => {
    if (!bgMusic.value) {
      bgMusic.value = new Audio('/sounds/dog-bg-music.mp3')
      bgMusic.value.loop = true
      bgMusic.value.volume = 0.6
    }

    if (!isMuted.value && userInteracted.value) {
      playMusic()
    }
  }

  const playMusic = () => {
    if (bgMusic.value && !isMuted.value) {
      bgMusic.value.play().then(() => {
        isPlaying.value = true
      }).catch((error) => {
        console.warn("Music playback failed:", error)
      })
    }
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
    localStorage.setItem('isMuted', isMuted.value)

    if (isMuted.value) {
      bgMusic.value?.pause()
      isPlaying.value = false
    } else {
      playMusic()
    }
  }

  const handleUserInteraction = () => {
    if (!userInteracted.value) {
      userInteracted.value = true
      playMusic()
    }
  }

  onMounted(() => {
    initMusic()
    document.addEventListener("click", handleUserInteraction)
  })

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleUserInteraction)
    if (bgMusic.value) {
      bgMusic.value.pause()
      bgMusic.value = null
    }
  })

  return {
    isMuted,
    isPlaying,
    userInteracted,
    toggleMute,
    handleUserInteraction
  }
}