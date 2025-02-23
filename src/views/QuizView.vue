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
                    <p class="font-odri text-white text-4xl lg:text-6xl kern-normal leading-[0.7] text-center mb-8">
                        {{ currentChapter.subtitle }}
                    </p>

                    <!-- Image/GIF Section -->
                    <div v-if="currentChapter.imageUrl" class="media-wrapper">
                        <img 
                            :src="currentChapter.imageUrl" 
                            :alt="currentChapter.title"
                            class="media"
                            :key="currentChapter.imageUrl"
                        />
                    </div>

                    <div class="options-grid">
                        <CardsView
                            v-for="(option, index) in currentChapter.options"
                            :key="index"
                            :text="option.text"
                            :response="option.response"
                            :flipped="option === selectedOption"
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
            chapter: 1,
            isTransitioning: false, 
            quiz: [],
            selectedOption: null,
            selectedTraits: [] // Store selected traits
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

            this.selectedOption = option;
            this.selectedTraits.push(option.trait); // Store the trait
            this.isTransitioning = true;

            // Delay transition to next chapter to allow animation to play
            setTimeout(() => {
                if (this.chapter < this.quiz.length) {
                    this.chapter++;
                    this.selectedOption = null;
                }
                this.isTransitioning = false;
            }, 3000); // Delay to allow response to be read
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
/* Main Container */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
    margin: auto;
}

/* Chapter Content */
.chapter-content {
    max-width: 800px;
    width: 100%;
    text-align: center;
}

/* Media (Image/GIF) Section */
.media-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.media {
    max-width: 100%;
    max-height: 180px;
}

/* Options Grid */
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

/* Flipped & Enlarged Card */
.flipped-card {
    transform: scale(1.2) rotateY(180deg);
    transition: transform 0.6s ease-in-out;
}

/* Faster Dissolve */
.dissolve-enter-active {
    transition: opacity 0.3s ease-out;
}

.dissolve-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.dissolve-enter-from {
    opacity: 0.3;
}

.dissolve-leave-to {
    opacity: 0;
}
</style>
