<template>
    <div class="card-wrapper" @click="handleClick">
        <div class="card" :class="{ flipped: flipped }">
            <!-- Card Front -->
            <div class="card-face card-front">
                <p class="font-lovelo text-brand-brown text-center text-md lg:text-lg leading-tight">
                    {{ text }}
                </p>
            </div>

            <!-- Card Back -->
            <div class="card-face card-back">
                <p class="font-lovelo text-white text-center text-md lg:text-lg leading-tight">
                    {{ response }}
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
        response: String,
        flipped: Boolean
    },
    methods: {
        handleClick() {
            if (!this.flipped) {
                this.$emit('click');
            }
        }
    }
};
</script>

<style scoped>
/* Wrapper to prevent perspective issues */
.card-wrapper {
    perspective: 1000px; /* Adds 3D depth */
    cursor: pointer;
}

/* Card Container */
.card {
    width: 100%;
    min-height: 140px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s ease-in-out;
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
    backface-visibility: hidden; /* Hides the back while front is shown */
    padding: 1rem;
}

/* Styling for Front */
.card-front {
    background-color: #f3e9dc;
    color: #5a3e2b;
}

/* Styling for Back */
.card-back {
    background-color: #5a3e2b;
    color: #f3e9dc;
    transform: rotateY(180deg);
}
</style>
