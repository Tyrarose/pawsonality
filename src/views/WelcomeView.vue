<script>
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import { useRouter } from 'vue-router';

export default {
  name: 'WelcomeView',
  components: {
    ButtonAtom
  },
  setup() {
    const router = useRouter();
    
    const goToQuiz = () => {
      router.push('/quiz');
    };

    return { goToQuiz };
  }
}
</script>

<template>
  <section class="bg-brand-red min-h-screen flex items-center justify-center">
    <div class="container m-6 text-center space-y-12"> 
      <img 
        src="/images/dog.png" 
        alt="dog logo" 
        class="object-contain w-40 h-40 mx-auto tilting-dog"
      />
      <h1 class="font-gulfs kern-tight text-white text-4xl">Hey there!</h1>
      <div class="space-y-6">
        <h6 class="font-odri kern-normal leading-tight text-white text-4xl">Ready to discover your inner pup?</h6>
        <h6 class="font-odri kern-normal text-white text-4xl leading-super-tight">
          Each choice leads you closer to uncovering your magical canine spirit.
        </h6>
      </div>
      <ButtonAtom class="mx-auto mt-12" buttonText="Let’s go on an adventure!" icon="fa fa-play" @click="goToQuiz" />
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

.leading-super-tight {
  line-height: 0.6;
}
</style>
