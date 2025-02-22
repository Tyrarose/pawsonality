<template>
    <div class="container">
        <!-- Top Progress Bar -->
        <PawgressBar :chapter="chapter" class="progress-bar"/>
        <transition name="dissolve" mode="out-in">
            <div v-if="currentChapter" :key="chapter" class="content-wrapper">
                <div class="chapter-content">
                    <h1 class="font-gulfs text-white text-4xl text-center mb-4">
                        {{ currentChapter.title }}
                    </h1>
                    <p class="font-odri text-white text-4xl lg:text-5xl kern-normal leading-[0.7] text-center mb-8">
                        {{ currentChapter.subtitle }}
                    </p>
                    
                    <div class="options-grid">
                        <CardsView
                            v-for="(option, index) in currentChapter.options"
                            :key="index"
                            :imageUrl="option.imageUrl"
                            :text="option.text"
                            :class="{ 'selected-card': option === selectedOption }"
                            @click="selectOption(option)"
                        />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import CardsView from '@/components/atoms/CardsView.vue';
import PawgressBar from '@/components/atoms/PawgressBar.vue';

export default {
    name: 'QuizView',
    components: {
        CardsView,
        PawgressBar
    },
    data() {
        return {
            chapter: 0,
            isTransitioning: false, 
            quiz: [],
            selectedOption: null  // Store the clicked option
        };
    },
    computed: {
        currentChapter() {
            return this.quiz.find(chapter => chapter.chapter === this.chapter) || null;
        }
    },
    methods: {
        selectOption(option) {
            if (this.isTransitioning) return;
            
            this.selectedOption = option; // Store clicked option
            this.isTransitioning = true;

            // Wait before transitioning (so the card remains visible)
            setTimeout(() => {
                if (this.chapter < this.quiz.length - 1) {
                    this.chapter++; // Move to next question
                }
            }, 400); // Delay transition to show selection
            
            // Reset selected option AFTER transition completes
            setTimeout(() => {
                this.selectedOption = null;
                this.isTransitioning = false;
            }, 400); // Allow a smooth transition
        },
        async loadQuizData() {
            try {
                const response = await fetch('/data/quizData.json');
                this.quiz = await response.json();
                console.log('Quiz data loaded:', this.quiz);
            } catch (error) {
                console.error('Error loading quiz data:', error);
            }
        }
    },
    created() {
        this.loadQuizData();
    }
};
</script>

<style scoped>
/* Existing styles remain unchanged */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
    margin: auto;
}

.chapter-content {
    max-width: 800px;
    width: 100%;
    text-align: center;
}

.options-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    max-width: 100%;
    margin: auto;
}

/* Mobile adjustments */
@media (max-width: 768px) {
    .options-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        max-width: 90vw;
    }
}

/* Highlight the selected card before transition */
.selected-card {
    transform: scale(1.1);
    box-shadow: 4 4 8px rgba(0, 0, 0);
    transition: all 0.3s ease-in-out;
}

/* Faster Dissolve */
.dissolve-enter-active {
    transition: opacity 0.3s ease-in-out;
}

.dissolve-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.dissolve-enter-from {
    opacity: 0.3; /* Start slightly visible */
}

.dissolve-leave-to {
    opacity: 0;
}


</style>
