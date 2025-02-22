<template>
  <button 
      class="bg-brand-cards font-gulfs text-brand-brown rounded-lg flex items-center gap-2 custom-button"
      @click="handleClick"
      @mousedown="isPressed = true"
      @mouseup="isPressed = false"
      @mouseleave="isPressed = false"
      :class="{ 'pressed': isPressed }"
  >
      <span>{{ buttonText }}</span>
      <i :class="icon"></i>
  </button>
</template>

<script>
export default {
  name: 'ButtonAtom',
  props: {
    buttonText: String,
    icon: String
  },
  data() {
    return {
      isPressed: false
    };
  },
  methods: {
    handleClick() {
      const sound = new Audio('/sounds/mouse-click.mp3'); // Load the sound
      sound.play(); // Play the sound
      this.$emit('click'); // Emit the click event
    }
  }
}
</script>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  position: relative;
  box-shadow: 4px 4px 0px black; /* Creates the black background effect */
}

.pressed {
  transform: translate(4px, 4px);
  box-shadow: none; /* Removes shadow when pressed */
}
</style>
