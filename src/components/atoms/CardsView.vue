<template>
    <div class="card-container">
        <div class="card">
            <div class="image-section">
                <img :src="imageUrl" :alt="text" />
            </div>
            <div class="text-section">
                <p>{{ text }}</p>
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
    }
}
</script>

<style scoped>
.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    width: 40vw;
    height: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.image-section {
    height: 50%;
    overflow: hidden;
}

.image-section img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text-section {
    height: 50%;
    padding: 1rem;
    background-color: white;
}

.text-section p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
}
</style>