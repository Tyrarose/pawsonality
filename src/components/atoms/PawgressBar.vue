<template>
  <div class="pawgress-container">
    <span 
      v-for="(paw, index) in totalPaws" 
      :key="'paw-' + index" 
      class="paw"
      :class="{ 'full': index < fullPaws, 'half': index === fullPaws && hasHalfPaw }"
    >
      <i class="fas fa-paw"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PawgressBar',
  props: {
    chapter: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      quizCount: 0 // Holds the total number of quiz questions
    };
  },
  computed: {
    totalPaws() {
      return Math.ceil(this.quizCount / 2); // Divide quiz count by 2 to determine paw slots
    },
    fullPaws() {
      return Math.floor(this.chapter / 2); // Every 2 chapters = 1 full paw
    },
    hasHalfPaw() {
      return this.chapter % 2 !== 0; // If odd, show a half paw
    }
  },
  async mounted() {
    try {
      const response = await fetch('/data/quizData.json'); // Fetch from public folder
      const quizData = await response.json();
      this.quizCount = quizData.length; // Set quiz count from JSON
    } catch (error) {
      console.error('Failed to load quiz data:', error);
    }
  }
};
</script>

<style scoped>
.pawgress-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.paw {
  font-size: 2rem;
  opacity: 0.3; /* Default faded paw */
  color: gray;
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}

.paw.full {
  opacity: 1;
  color: #FFD700; /* Gold for full paws */
}

.paw.half {
  opacity: 0.6;
  color: #FFA500; /* Orange for half paws */
}
</style>
