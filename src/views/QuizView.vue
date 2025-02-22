<template>
    <div class="quiz-container">
        <transition name="slide-up">
            <div v-if="currentChapter" class="chapter-content">
                <h2>{{ currentChapter.title }}</h2>
                <div class="options-grid">
                    <div
                        v-for="(option, index) in currentChapter.options"
                        :key="index"
                        class="option-card"
                        @click="selectOption(option)"
                    >
                        {{ option.text }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'QuizView',
    data() {
        return {
            chapters: [
                {
                    title: 'Chapter 1',
                    options: [
                        { text: 'Option 1', nextChapter: 1 },
                        { text: 'Option 2', nextChapter: 2 }
                    ]
                }
            ],
            currentChapterIndex: 0
        }
    },
    computed: {
        currentChapter() {
            return this.chapters[this.currentChapterIndex];
        }
    },
    methods: {
        selectOption(option) {
            if (option.nextChapter !== undefined) {
                this.currentChapterIndex = option.nextChapter;
            }
        }
    }
}
</script>

<style scoped>
.quiz-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.chapter-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.option-card {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s;
}

.option-card:hover {
    transform: translateY(-2px);
    background: #e8e8e8;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
    transform: translateY(0);
}
</style>