let correct = 0;
let incorrect = 0;

const cards = [
    { src: 'contentGenerator.png', label: 'AI Chatbot Systems (e.g., ChatGPT, Gemini, Perplexity, Claude)', type: 'use' },
    { src: 'translation.jpeg', label: 'AI Translation Systems (e.g., Google Translator, DeepL)', type: 'use' },
    { src: 'recommendation.jpeg', label: 'AI Recommendation Systems (e.g., Netflix Recommendation System)', type: 'use' },
    { src: 'transcription.jpeg', label: 'AI Transcription Systems (e.g., OtterAI, KonchAI)', type: 'use' },
    { src: 'grammarly.jpeg', label: 'AI Writing Assistants Systems (e.g., Grammarly)', type: 'use' },
    { src: 'image_generation.png', label: 'AI Image Generation Systems (e.g., DALL-E, Midjourney)', type: 'use' },
    { src: 'personal_assistant.png', label: 'AI Personal Assistants (e.g., Siri, Alexa, Google Assistant)', type: 'use' },
    { src: 'facial_recognition.png', label: 'AI Facial Recognition Systems (e.g., Clearview AI, Face++)', type: 'use' },
    { src: 'music_composition.png', label: 'AI Music Composition Systems (e.g., AIVA, Amper Music)', type: 'use' },
    { src: 'autonomous_vehicle.png', label: 'AI Autonomous Vehicles (e.g., Tesla Autopilot, Waymo)', type: 'use' }
];

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadNextCard();
});

function handleSwipe(event) {
    const card = event.target;
    let offsetX;

    if (event.type === 'dragend') {
        offsetX = event.offsetX;
    } else if (event.type === 'touchend') {
        const touch = event.changedTouches[0];
        offsetX = touch.pageX - card.getBoundingClientRect().left;
    }

    const currentCard = cards[currentIndex - 1]; // currentIndex has already been incremented
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
        // End of cards, show final message
        displayFinalMessage();
        return;
    }

    const currentCard = cards[currentIndex];

    game.innerHTML = `
        <div class="card" draggable="true" ondragend="handleSwipe(event)" ontouchend="handleSwipe(event)">
            <img src="${currentCard.src}" alt="${currentCard.label}">
            <div class="label">${currentCard.label}</div>
        </div>
    `;

    currentIndex++;
}

function displayFinalMessage() {
    const game = document.getElementById('game');
    let messages = [];

    if (correct <= 3) {
        messages = [
            "You're just starting your AI journey, but there's a whole world of possibilities ahead! Keep exploring and see how AI can enrich your daily life!",

        ];
    } else if (correct <= 7) {
        messages = [
            "AI is becoming a great ally in your daily life! You're on the right track to making the most out of these amazing tools.",
        ];
    } else {
        messages = [
            "Wow! You're a pro at integrating AI into your routine, maximizing efficiency and productivity. Keep being an AI champion!",
        ];
    }

    // Randomly select a message from the chosen category
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Hide the labels and show the message
    document.querySelector('.label-left').style.display = 'none';
    document.querySelector('.label-right').style.display = 'none';
    game.innerHTML = `<div class="end-message">${message}</div>`;
}
