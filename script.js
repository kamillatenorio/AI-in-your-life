let correct = 0;
let incorrect = 0;

const cards = [
    { src: 'contentGenerator.png', label: 'AI Chatbot Systems (e.g., ChatGPT)', type: 'use' },
    { src: 'translation.jpeg', label: 'AI Translation Systems (e.g., Google Translator, DeepL)', type: 'use' },
    { src: 'recommendation.jpeg', label: 'AI Recommendation Systems (e.g., Netflix Recommendation System, Spotify Recommendation System)', type: 'use' },
    { src: 'transcription.jpeg', label: 'AI Transcription Systems (e.g., OtterAI, KonchAI)', type: 'use' },
    { src: 'grammarly.jpeg', label: 'AI Writing Assistants Systems (e.g., Grammarly)', type: 'use' }
    // Add more items as needed
];

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadNextCard();
});

function handleSwipe(event) {
    const card = event.target;
    const offsetX = event.offsetX;

    const currentCard = cards[currentIndex - 1];  // currentIndex has already been incremented
    const isuseSwipe = offsetX >= card.offsetWidth / 2;

    if (isuseSwipe && currentCard.type === 'use') {
        correct++;
    } else {
        incorrect++;
    }

    updateResults();
    loadNextCard();
}

function updateResults() {
    document.getElementById('correct').textContent = correct;
    document.getElementById('incorrect').textContent = incorrect;
}

function loadNextCard() {
    const game = document.getElementById('game');

    if (currentIndex >= cards.length) {
        // End of cards
        game.innerHTML = '<div class="end-message"></div>';
        return;
    }

    const currentCard = cards[currentIndex];

    game.innerHTML = `
        <div class="card" draggable="true" ondragend="handleSwipe(event)">
            <img src="${currentCard.src}" alt="${currentCard.label}">
            <div class="label">${currentCard.label}</div>
        </div>
    `;

    currentIndex++;
}
