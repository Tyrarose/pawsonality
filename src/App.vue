<script>
import SplashView from './views/SplashView.vue'
import WelcomeView from './views/WelcomeView.vue'

export default {
  name: 'App',
  components: {
    SplashView,
    WelcomeView
  },
  data() {
    return {
      showSplash: true,
      showWelcome: false,
      bgMusic: null,
      isMuted: false,
      isPlaying: false, // Controls when to show the mute button
      userInteracted: false // Tracks if user interacted
    }
  },
  mounted() {
    this.initMusic();

    setTimeout(() => {
      this.showWelcome = true;
    }, 10);

    // Listen for any user interaction to try playing the music again
    document.addEventListener("click", this.userInteraction);
  },
  methods: {
    initMusic() {
      if (!this.bgMusic) {
        this.bgMusic = new Audio('/sounds/dog-bg-music.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.6;
      }

      this.isMuted = localStorage.getItem('isMuted') === 'true';

      if (!this.isMuted) {
        this.bgMusic.play().then(() => {
          this.isPlaying = true;
          this.userInteracted = true;
        }).catch(() => {
          console.warn("Autoplay was blocked. Waiting for user interaction.");
        });
      }

      this.bgMusic.onplay = () => {
        this.isPlaying = true;
      };
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      localStorage.setItem('isMuted', this.isMuted);

      if (this.isMuted) {
        this.bgMusic.pause();
      } else {
        this.bgMusic.play().then(() => {
          this.isPlaying = true;
        }).catch(() => {
          console.warn("Autoplay blocked, waiting for user action.");
        });
      }
    },
    userInteraction() {
      if (!this.isPlaying && !this.isMuted) {
        this.bgMusic.play().then(() => {
          this.isPlaying = true;
          this.userInteracted = true;
          document.removeEventListener("click", this.userInteraction);
        }).catch(() => {
          console.warn("Autoplay was blocked again. Still waiting for interaction.");
        });
      }
    },
    onWelcomeEntered() {
      this.showSplash = false;
    }
  }
}
</script>

<template>
  <div id="app" @click="userInteraction">
    <button v-if="isPlaying" class="mute-button" @click.stop="toggleMute">
      <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
    </button>

    <transition name="scroll-up">
      <SplashView v-if="showSplash" />
    </transition>

    <transition name="scroll-up" @after-enter="onWelcomeEntered">
      <WelcomeView v-if="showWelcome" />
    </transition>
  </div>
</template>


<style scoped>
/* Mute Button */
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

/* Scroll Up Transition */
.scroll-up-enter-active, .scroll-up-leave-active {
  transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
}

.scroll-up-enter {
  transform: translateY(100%);
  opacity: 0;
}

.scroll-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.scroll-up-leave-active {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
