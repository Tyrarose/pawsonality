<template>
  <section 
    class="bg-brand-red min-h-screen flex items-center justify-center" 
    style="background-image: url('/images/mesh.png'); background-repeat: repeat;"
  >
    <div class="container text-center">
      <img 
        src="/images/dog.png" 
        alt="dog logo" 
        class="object-contain w-80 h-80 mx-auto tilting-dog"
      />
      <h1 class="font-gulfs text-white text-5xl mt-5">Pawsonality</h1>
      <h6 class="font-odri text-white text-5xl mt-2">Dog Breed Personality Type Quiz</h6>

      <!-- Custom Progress Bar -->
      <div class="progress-bar-container mt-5 mx-auto">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      
      <!-- Show loading message while GIFs are preloading -->
      <p v-if="!allGifsLoaded" class="text-white mt-3 text-lg">Loading animations...</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SplashView',
  data() {
    return {
      progress: 0,
      allGifsLoaded: false,
      gifUrls: [
        "/images/options/1.gif",
        "/images/options/2.gif",
        "/images/options/3.gif",
        "/images/options/4.gif",
        "/images/options/5.gif",
        "/images/options/6.gif",
        "/images/options/7.gif",
        "/images/options/8.gif",
        "/images/options/9.gif",
        "/images/options/10.gif"
      ],
    };
  },
  mounted() {
    this.preloadGifs();
    this.startLoading();
  },
  methods: {
    preloadGifs() {
      let loadedCount = 0;
      this.gifUrls.forEach((gif) => {
        const img = new Image();
        img.src = gif;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === this.gifUrls.length) {
            this.allGifsLoaded = true;
          }
        };
      });
    },
    startLoading() {
      const steps = [8, 85, 90, 100];
      let index = 0;

      const interval = setInterval(() => {
        if (index < steps.length) {
          this.progress = steps[index];
          index++;
        } else {
          clearInterval(interval);
          if (this.allGifsLoaded) {
            this.$emit('loadingComplete'); // Emit event only when GIFs are loaded
          }
        }
      }, 800);
    }
  }
};
</script>

<style scoped>
/* Tilting Dog Animation */
@keyframes tilt {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
}

.tilting-dog {
  animation: tilt 1.5s ease-in-out infinite alternate;
}

/* Progress Bar Styles */
.progress-bar-container {
  width: 50%;
  height: 12px;
  border-radius: 10px;
  border: 2px solid white;
  background-color: transparent;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: white;
  width: 0;
  transition: width 0.8s ease-in-out;
  border-radius: 10px;
}
</style>
