<script>
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'WelcomeView',
  components: {
    ButtonAtom
  },
  setup() {
    const router = useRouter()
    const fullH1Text = 'Hey there!'
    const fullH6Text1 = 'Ready to discover your inner pup?'
    const fullH6Text2 = 'Each choice leads you closer to uncovering your magical canine spirit.'

    const h1Text = ref('')
    const h6Text1 = ref('')
    const h6Text2 = ref('')
    const showButton = ref(false)
    const buttonClicked = ref(false)
    const showScreen = ref(true) // Controls visibility of the welcome screen

    const typeText = (target, text, speed, callback) => {
      let i = 0
      const interval = setInterval(() => {
        target.value += text[i]
        i++
        if (i === text.length) {
          clearInterval(interval)
          if (callback) setTimeout(callback, 500)
        }
      }, speed)
    }

    onMounted(() => {
      typeText(h1Text, fullH1Text, 0, () => {
        typeText(h6Text1, fullH6Text1, 30, () => {
          typeText(h6Text2, fullH6Text2, 30, () => {
            showButton.value = true
          })
        })
      })
    })

    const goToQuiz = () => {
      buttonClicked.value = true
      
      router.push('/quiz')
    }

    return { h1Text, h6Text1, h6Text2, showButton, goToQuiz, buttonClicked, showScreen }
  }
}
</script>

<template>
  <section v-if="showScreen" class="bg-brand-red mt-20 flex items-center justify-center">
    <div class="container m-6 text-center space-y-12"> 
      <img 
        src="/images/dog.png" 
        alt="dog logo" 
        class="object-contain w-40 h-40 mx-auto tilting-dog"
      />
      <h1 v-if="!buttonClicked" class="font-gulfs kern-tight text-white text-4xl">{{ h1Text }}</h1>
      <div v-if="!buttonClicked" class="space-y-6">
        <h6 class="font-odri kern-normal leading-tight text-white text-4xl">{{ h6Text1 }}</h6>
        <h6 class="font-odri kern-normal text-white text-4xl leading-[0.6]">{{ h6Text2 }}</h6>
      </div>
      <div 
        v-if="showButton" 
        class="relative flex justify-center items-center"
      >
        <ButtonAtom 
          v-if="!buttonClicked" 
          class="mx-auto mt-12 slide-in-button" 
          :class="{ 'expand-button': buttonClicked }"
          buttonText="Let’s go on an adventure!" 
          icon="fa fa-play" 
          @click="goToQuiz"
        />
        <div v-if="buttonClicked" class="expanding-circle"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes tilt {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

.tilting-dog {
  animation: tilt 1.5s ease-in-out infinite alternate;
}

.slide-in-button {
  opacity: 0;
  transform: translateY(30px);
  animation: slide-in 0.5s ease-out forwards;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Expanding Circle Animation */
.expanding-circle {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: var(--button-color, #fff);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: expand-circle 0.8s ease-out forwards, fade-out 0.8s ease-out 0.8s forwards;
}

/* Circle Expansion */
@keyframes expand-circle {
  0% {
    width: 100px;
    height: 100px;
  }
  100% {
    width: 500vw;
    height: 500vw;
  }
}

/* Fade Out Effect */
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
