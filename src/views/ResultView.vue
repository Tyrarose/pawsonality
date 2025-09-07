<template>
  <section 
    class="bg-brand-red min-h-screen flex items-center justify-center overflow-hidden" 
    style="background-image: url('/images/mesh.png'); background-repeat: repeat;"
  >
    <div class="container text-center relative">
      
      <!-- Dog Image (Hidden After Loading) -->
      <img 
        v-if="!loadingComplete"
        src="/images/dog.png" 
        alt="dog logo" 
        class="object-contain w-40 h-40 mx-auto tilting-dog"
      />

      <!-- Animated Bouncing Text (Hidden After Loading) -->
      <h6 
        v-if="!loadingComplete" 
        class="font-odri text-white text-5xl mt-2 flex justify-center"
      >
        <span 
          v-for="(char, index) in 'Calculating your dog breed personality...'" 
          :key="index"
          class="inline-block"
          :class="{'bounce-text': !loadingComplete}"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          {{ char }}
        </span>
      </h6>

      <!-- Progress Bar (Hidden After Loading) -->
      <div v-if="!loadingComplete" class="progress-bar-container mt-5 mx-auto relative">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Expanding White Circle -->
      <div v-if="expandingCircle" class="expanding-circle"></div>

      <!-- Pop-in Dog Breed Result -->
      <transition name="pop-in">
        <div v-if="loadingComplete" class="relative z-10">
          <h1 class="font-odri text-white text-4xl mt-5">You are a</h1>
          <h1 class="font-gulfs text-white text-5xl mt-5">{{ breed || "Mysterious Pup" }}</h1>
        </div>
      </transition>

      <ButtonAtom 
        v-if="loadingComplete && !buttonClicked" 
        class="mx-auto mt-12 slide-in-button relative z-10" 
        :class="{ 'expand-button': buttonClicked }"
        buttonText="Share Results" 
        icon="fa fa-share" 
        @click="shareResults"
      />
    </div>
  </section>
</template>

<script>
import { supabase } from '@/api/supabase';
import ButtonAtom from '@/components/atoms/ButtonAtom.vue';

export default {
  name: 'ResultView',
  components: {
    ButtonAtom
  },
  data() {
    return {
      progress: 10,
      breed: '',
      selections: [],
      startTime: null,
      loadingComplete: false,
      expandingCircle: false,
    };
  },
  async mounted() {
    this.breed = this.$route.query.breed || 'Unknown Breed';
    this.startTime = localStorage.getItem('quizStartTime') || Date.now();
    this.selections = JSON.parse(localStorage.getItem('quizSelections')) || [];

    this.startLoading();
    await this.saveQuizResult();
  },
  methods: {
    startLoading() {
      let interval = setInterval(() => {
        if (this.progress < 90) {
          this.progress += 10;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            this.progress = 100;

            // Start expanding the white circle
            this.expandingCircle = true;
            
            setTimeout(() => {
              this.loadingComplete = true; // Show result after animation
              this.expandingCircle = false; // Remove circle after reveal
            }, 900); // Timing matches the animation duration
          }, 500);
        }
      }, 300);
    },
    async saveQuizResult() {
      const endTime = Date.now();
      const completionTime = Math.round((endTime - this.startTime) / 1000);
      const referralSource = document.referrer || 'Direct';
      const deviceType = this.getDeviceType();
      const browserType = this.getBrowserType();
      const restartCount = parseInt(localStorage.getItem('quizRestartCount')) || 0;
      const dropOffData = JSON.parse(localStorage.getItem('lastDropOff')) || null;
      const quizRestarts = localStorage.getItem('quizRestartCount') || 0;
      const shareCount = parseInt(localStorage.getItem('quizShareCount')) || 0;
      const language = navigator.language || 'en';

      const { error } = await supabase.from('quiz_results').insert([
        {
          breed: this.breed,
          selections: this.selections,
          completion_time: completionTime,
          referral_source: referralSource,
          device_type: deviceType,
          browser_type: browserType,
          restart_count: restartCount,
          timestamp: new Date(),
          drop_off: dropOffData,
          quiz_restarts: quizRestarts,
          selection_order: this.selections.map((s) => s.order),
          share_count: shareCount,
          language: language
        }
      ]);

      if (error) console.error('Error saving quiz result:', error);
    },
    getDeviceType() {
      if (window.innerWidth < 768) return 'Mobile';
      if (window.innerWidth < 1024) return 'Tablet';
      return 'Desktop';
    },
    getBrowserType() {
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Chrome')) return 'Chrome';
      if (userAgent.includes('Safari')) return 'Safari';
      if (userAgent.includes('Firefox')) return 'Firefox';
      return 'Other';
    },
    shareResults() {
      if (this.buttonClicked) return; // Prevent duplicate clicks
      this.buttonClicked = true;

      let count = parseInt(localStorage.getItem('quizShareCount')) || 0;
      count++;
      localStorage.setItem('quizShareCount', count);

      alert("Thanks for sharing!");

      // Reset buttonClicked after a delay (if needed)
      setTimeout(() => {
        this.buttonClicked = false;
      }, 500);
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

/* Bouncing Text Animation */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.bounce-text {
  display: inline-block;
  animation: bounce 0.6s ease-in-out infinite;
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
  transition: width 0.3s ease-in-out;
  border-radius: 10px;
}

/* Expanding White Circle */
.expanding-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  animation: expandCircle 0.9s ease-in-out forwards;
}

@keyframes expandCircle {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 3000px; /* Large enough to cover the screen */
    height: 3000px;
    opacity: 1;
  }
}

/* Pop-In Animation */
.pop-in-enter-active {
  animation: popIn 0.2s ease-in-out 0.1s forwards; /* Delay to sync with circle */
  opacity: 0;
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
