<template>
    <div 
        class="card-container cursor-pointer transform transition-transform"
        :class="{ 'clicked': isClicked }"
        @click="handleClick"
    >
        <div class="bg-brand-cards rounded-lg p-4 flex items-center justify-center">
            <p class="font-lovelo text-brand-brown text-center text-md lg:text-lg leading-tight">
                {{ text }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardsView',
    props: {
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

/* Increase card size */
.card-container > div {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Larger card height on desktop */
@media (min-width: 1024px) {
    .card-container > div {
        min-height: 140px;
    }
}

.clicked {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
    transform: translate(4px, 4px);
}
</style>
