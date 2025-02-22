<template>
    <div class="quiz-container">
        <div class="quiz-header">
            <div class="quiz-icon">
                <img :src="quizIcon" :alt="quizTitle" />
            </div>
            <h2 class="quiz-title">{{ quizTitle }}</h2>
        </div>
        
        <div class="quiz-content">
            <p class="quiz-question">{{ quizQuestion }}</p>
            <div class="quiz-progress">
                <span>Card {{ cardNumber }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChaptersView',
    props: {
        quizIcon: {
            type: String,
            required: true
        },
        quizTitle: {
            type: String,
            required: true
        },
        quizQuestion: {
            type: String,
            required: true
        },
        cardNumber: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>
.quiz-container {
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quiz-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.quiz-icon img {
    width: 48px;
    height: 48px;
    object-fit: contain;
}

.quiz-title {
    font-size: 1.5rem;
    margin: 0;
}

.quiz-question {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
}

.quiz-progress {
    text-align: right;
    color: #666;
}
</style>