let using = 0;
let notUsing = 0;

const cards = [
    { src: 'image_generation.png', label: 'AI image generation systems (e.g. DALL-E, Midjourney)', type: 'use' },
    { src: 'grammarly.jpeg', label: 'AI writing assistant systems (e.g. Grammarly)', type: 'use' },
    { src: 'translation.png', label: 'AI translation systems (e.g. Google Translator, DeepL)', type: 'use' },
    { src: 'contentGenerator.png', label: 'AI chatbot systems (e.g. ChatGPT)', type: 'use' },
    { src: 'recommendation.jpeg', label: 'AI recommendation systems (e.g. Netflix recommendation system)', type: 'use' },
    { src: 'personal_assistant.jpeg', label: 'AI voice assistants (e.g. Siri, Alexa, Google Assistant)', type: 'use' },
    { src: 'autonomous_vehicle.png', label: 'Autonomous AI vehicles (e.g. Tesla Autopilot, Waymo)', type: 'use' },
    { src: 'transcription.jpeg', label: 'AI transcription systems (e.g. OtterAI, KonchAI)', type: 'use' },
    { src: 'CoPilot.png', label: 'AI coding assistant (e.g. GitHub Copilot)', type: 'use' },
    { src: 'music_composition.png', label: 'AI music composition systems (e.g. Filmora AI Music Composer, beatoven.ai)', type: 'use' },
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
        using++;
    } else {
        notUsing++;
    }

    loadNextCard();
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

    if (using <= 3) {
        messages = [
            "You are just at the beginning of your AI journey, but a whole world of possibilities lies ahead of you!",
        ];
    } else if (using <= 7) {
        messages = [
            "AI systems are great allies in your daily life!",
        ];
    } else {
        messages = [
            "Wow! You are a pro at integrating AI systems into your daily routine, maximizing efficiency and productivity.",
        ];
    }

    // Randomly select a message from the chosen category
    const message = messages[Math.floor(Math.random() * messages.length)];

    // Hide the labels and show the message with results
    document.querySelector('.label-left').style.display = 'none';
    document.querySelector('.label-right').style.display = 'none';
    
    game.innerHTML = `
        <div class="card end-message">
            <p>${message}</p>
            <!-- <div class="results">
                <p>You use <span id="using">${using}</span> out of 10 presented AI systems.</p> 
            </div>!-->
        </div>
    `;
}

function updateResults() {
    document.getElementById('using').textContent = using;
    document.getElementById('notUsing').textContent = notUsing;
}
