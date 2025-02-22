<script>
export default {
  name: 'SplashView',
}
</script>

<template>
  <section class="bg-brand-red min-h-screen flex items-center justify-center" 
  style="background-image: url('/images/mesh.png'); background-repeat: repeat;">
    <div 
      class="container text-center" 
    >
    <img 
      src="/images/dog.png" 
      alt="dog logo" 
      class="object-contain w-80 h-80 mx-auto tilting-dog"
    />
      <h1 class="font-gulfs text-white text-5xl mt-5">Pawsonality</h1>
      <h6 class="font-odri text-white text-5xl mt-2">Dog Breed Personality Type Quiz</h6>
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
</style>
