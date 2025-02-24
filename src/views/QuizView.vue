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
                            :friend="option.friend"
                            :flipped="option === selectedOption"
                            :readingTime="Math.max(2, option.friend.length / 10)"
                            @click="selectOption(option)"
                        />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
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
        traitScores: {}, // Track scores for each trait
        dogBreeds: [], // Load dog breed data
        readingTimeout: 3000,
        selections: [], // Track user selections
        startTime: null,
        restartCount: localStorage.getItem('quizRestartCount') || 0
    };
},
    computed: {
        currentChapter() {
            return this.quiz.find(chapter => chapter.chapter === this.chapter) || null;
        }
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        mounted() {
    window.addEventListener('beforeunload', this.handleDropOff);
    this.startTime = Date.now();
},
methods: {
    handleDropOff() {
        if (this.selections.length > 0) {
            localStorage.setItem('lastDropOff', JSON.stringify({
                timestamp: Date.now(),
                progress: this.chapter
            }));
        }
    }
},
beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleDropOff);
},
        selectOption(option) {
    if (this.isTransitioning) return;

    this.selectedOption = option;

    // Track selection with timestamp
    this.selections.push({
        question: this.currentChapter.title,
        option: option.text,
        timestamp: Date.now()
    });

    // Save to localStorage in case user drops off
    localStorage.setItem('quizSelections', JSON.stringify(this.selections));

    this.traitScores[option.trait] = (this.traitScores[option.trait] || 0) + 1;
    this.isTransitioning = true;

    const readingTime = Math.max(2, option.friend.length / 10) * 1000;

    this.$nextTick(() => {
        setTimeout(() => {
            if (this.chapter < this.quiz.length) {
                this.chapter++;
                this.selectedOption = null;
            } else {
                this.calculatePersonalityType();
            }
            this.isTransitioning = false;
        }, readingTime);
    });
},

        async loadQuizData() {
            try {
                const response = await fetch('/data/quizData.json');
                this.quiz = await response.json();
                console.log('Quiz data loaded:', this.quiz);
            } catch (error) {
                console.error('Error loading quiz data:', error);
            }
        },
        async loadDogBreedData() {
            try {
                const response = await fetch('/data/dogbreedsData.json');
                const data = await response.json();
                this.dogBreeds = data.breeds;
            } catch (error) {
                console.error('Error loading dog breed data:', error);
            }
        },
        calculatePersonalityType() {
            // Get the top three highest scoring traits
            const sortedTraits = Object.entries(this.traitScores)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([trait]) => trait);

            console.log('Top Traits:', sortedTraits);

            // Find the best matching dog breed
            const matchedBreed = this.findBestMatchingBreed(sortedTraits);

            console.log('Best Matching Breed:', matchedBreed);

            // Navigate to results page with breed name
            this.router.push({ path: '/results', query: { breed: matchedBreed } });
        },
        findBestMatchingBreed(traits) {
            let bestMatch = null;
            let maxMatches = 0;

            this.dogBreeds.forEach(breed => {
                // Count how many traits match
                const matches = breed.personality.filter(trait => traits.includes(trait)).length;

                if (matches > maxMatches) {
                    maxMatches = matches;
                    bestMatch = breed.name;
                }
            });

            return bestMatch || 'Unknown Breed';
        }
    },
    async created() {
        await this.loadQuizData();
        await this.loadDogBreedData();
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
    transition: transform 2s ease-in-out;
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
