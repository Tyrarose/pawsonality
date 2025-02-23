<template>
    <div class="card-wrapper" @click="handleClick">
        <div class="card" :class="{ flipped: flipped }">
            <!-- Progress Bar (Appears when flipped) -->
            <div v-if="flipped" class="progress-bar">
                <div class="progress-bar-fill" :style="{ animationDuration: readingTime + 's' }"></div>
            </div>

            <!-- Card Front -->
            <div class="card-face card-front">
                <p class="font-lovelo text-brand-brown text-center text-md lg:text-lg leading-tight">
                    {{ text }}
                </p>
            </div>

            <!-- Card Back -->
            <div class="card-face card-back">
                <p class="font-lovelo text-white text-center text-md lg:text-lg leading-tight">
                    {{ friend }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardsView',
    props: {
        text: String,
        friend: String,
        flipped: Boolean,
        readingTime: Number // Pass readingTime from parent
    },
    methods: {
        handleClick() {
            if (!this.flipped) {
                const audio = new Audio('/sounds/mouse-click.mp3');
                audio.play();
                this.$emit('click', this.readingTime); // Pass readingTime up
            }
        }
    }
};
</script>

<style scoped>
/* Wrapper for 3D flip effect */
.card-wrapper {
    perspective: 1000px;
    cursor: pointer;
}

/* Card Container */
.card {
    width: 100%;
    min-height: 140px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s ease-in-out; /* Slower flip animation */
}

/* Flip the card when 'flipped' class is applied */
.card.flipped {
    transform: rotateY(180deg);
}

/* Front & Back Faces */
.card-face {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    padding: 1rem;
}

/* Styling for Front */
.card-front {
    @apply bg-brand-cards text-brand-brown;
}

/* Styling for Back */
.card-back {
    @apply bg-brand-brown text-brand-cards;
    transform: rotateY(180deg);
}

/* Progress Bar */
.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 10;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    width: 100%;
    @apply bg-brand-cards;
    animation: progress-fill linear forwards;
}

@keyframes progress-fill {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}
</style>
