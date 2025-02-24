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
      <h6 class="font-odri text-white text-5xl mt-2">
        Calculating your dog breed personality
      </h6>

      <!-- Custom Progress Bar -->
      <div class="progress-bar-container mt-5 mx-auto">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>

      <h1 class="font-gulfs text-white text-5xl mt-5">You are a</h1>
      <h1 class="font-gulfs text-white text-5xl mt-5">
        {{ breed || "Mysterious Pup" }}
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ResultView',
  data() {
    return {
      progress: 0,
      breed: ''
    };
  },
  mounted() {
    this.startLoading();
    this.breed = this.$route.query.breed || 'Unknown Breed'; // Get breed from route params
  },
  methods: {
    startLoading() {
      const steps = [8, 85, 90, 100];
      let index = 0;

      const interval = setInterval(() => {
        if (index < steps.length) {
          this.progress = steps[index];
          index++;
        } else {
          clearInterval(interval);
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
