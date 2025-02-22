<template>
    <div 
        class="card-container cursor-pointer transform transition-transform"
        :class="{ 'clicked': isClicked }"
        @click="handleClick"
    >
        <div class="bg-brand-cards rounded-lg p-2 flex flex-col items-center justify-between">
            <div class="image-section flex justify-center items-center h-24 lg:h-32 w-full">
                <img 
                    :src="imageUrl" 
                    :alt="text"
                    class="max-w-full max-h-full object-contain"
                />
            </div>
            <div class="text-section">
                <p class="font-lovelo text-brand-brown text-center text-xs lg:text-lg leading-tight">
                    {{ text }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardsView',
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isClicked: false
        };
    },
    methods: {
        handleClick() {
            const clickSound = new Audio('/sounds/mouse-click.mp3');
            clickSound.play();
            
            this.isClicked = true;
            setTimeout(() => {
                this.isClicked = false;
            }, 150);

            this.$emit('click');
        }
    }
}
</script>

<style scoped>
.card-container {
    height: 100%;
    transition: all 0.15s ease-in-out;
}

.card-container > div {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-height: 190px;
}

/* Increase min-height for desktop */
@media (min-width: 1024px) {
    .card-container > div {
        min-height: 220px;
    }
}


.image-section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.text-section {
    padding: 0.5rem;
}

.text-section p {
    color: #8B4513;
}

.clicked {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
    transform: translate(4px, 4px);
}
</style>
