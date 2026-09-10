/* =========================================
   SCREEN SYSTEM
========================================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const screen = document.getElementById(id);

    if (screen) {
        screen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   OPENING
========================================= */

document.getElementById("startBtn").onclick = () => {
    showScreen("password-screen");
};


/* =========================================
   PASSWORD
========================================= */

const password = document.getElementById("password");
const passwordBtn = document.getElementById("passwordBtn");
const passwordMessage = document.getElementById("passwordMessage");

function unlock() {

    if (password.value.trim() === "29thmarch") {

        passwordMessage.innerText =
            "Welcome, Mistu ❤️";

        passwordBtn.disabled = true;
        password.disabled = true;

        setTimeout(() => {
            showScreen("envelope-screen");
        }, 1000);

    } else {

        passwordMessage.innerText =
            "Hmm... that's not it 😜";

        password.value = "";

        password.focus();
    }
}

passwordBtn.onclick = unlock;

password.onkeydown = event => {

    if (event.key === "Enter") {
        unlock();
    }

};


/* =========================================
   ENVELOPE
========================================= */

const envelope =
    document.getElementById("envelope");

envelope.onclick = () => {

    if (envelope.classList.contains("open")) {
        return;
    }

    envelope.classList.add("open");

    setTimeout(() => {

        showScreen("game-screen");

        startGame();

    }, 1700);

};


/* =========================================
   HEART GAME
========================================= */

const gameArea =
    document.getElementById("game-area");

const heart =
    document.getElementById("heart");

const score =
    document.getElementById("score");

const gameMessage =
    document.getElementById("game-message");

let gameScore = 0;
let gameRunning = false;


function startGame() {

    gameScore = 0;
    gameRunning = true;

    heart.style.display = "flex";

    score.innerText = "0 / 5";

    gameMessage.innerText =
        "Catch the glowing heart ❤️";

    moveHeart();
}


function moveHeart() {

    if (!gameRunning) {
        return;
    }

    const maxX =
        gameArea.clientWidth -
        heart.offsetWidth;

    const maxY =
        gameArea.clientHeight -
        heart.offsetHeight;

    heart.style.left =
        Math.random() * Math.max(maxX, 0) + "px";

    heart.style.top =
        Math.random() * Math.max(maxY, 0) + "px";
}


heart.onclick = () => {

    if (!gameRunning) {
        return;
    }

    gameScore++;

    score.innerText =
        `${gameScore} / 5`;

    createGameExplosion();

    if (gameScore >= 5) {

        gameRunning = false;

        heart.style.display = "none";

        gameMessage.innerText =
            "You caught all my hearts! ❤️";

        setTimeout(() => {
            showScreen("cake-screen");
        }, 1200);

    } else {

        gameMessage.innerText =
            "Another one! ❤️";

        moveHeart();

    }
};


function createGameExplosion() {

    for (let i = 0; i < 5; i++) {

        const item =
            document.createElement("span");

        item.innerText = "❤️";

        item.className = "game-pop";

        item.style.left =
            heart.offsetLeft + "px";

        item.style.top =
            heart.offsetTop + "px";

        item.style.setProperty(
            "--randomX",
            `${(Math.random() - .5) * 100}px`
        );

        item.style.setProperty(
            "--randomY",
            `${(Math.random() - .5) * 100}px`
        );

        gameArea.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 700);
    }
}


/* =========================================
   CAKE
========================================= */

const blowBtn =
    document.getElementById("blowBtn");

const flame =
    document.getElementById("flame");

const cakeMessage =
    document.getElementById("cakeMessage");

blowBtn.onclick = () => {

    flame.classList.add("off");

    cakeMessage.innerText =
        "Wish made! ✨❤️";

    blowBtn.innerText =
        "Wish Sent ❤️";

    blowBtn.disabled = true;

    setTimeout(() => {

        showScreen("birthday-screen");

        startTyping();

    }, 1600);
};


/* =========================================
   BIRTHDAY TYPING
========================================= */

const typingText =
    document.getElementById("typing-text");

const birthdayText =
    "You are one of the most special people in my life. Today is all about celebrating YOU. I hope this little surprise makes you smile. ❤️";

let typingDone = false;

function startTyping() {

    if (typingDone) {
        return;
    }

    typingDone = true;

    let index = 0;

    const timer =
        setInterval(() => {

            typingText.innerText +=
                birthdayText[index];

            index++;

            if (index >= birthdayText.length) {
                clearInterval(timer);
            }

        }, 35);
}


/* =========================================
   LOVE COUNTER
========================================= */

document.getElementById("counterBtn").onclick = () => {

    showScreen("counter-screen");

};


const counterHeart =
    document.getElementById(
        "loveCounterHeart"
    );

const counterNumber =
    document.getElementById(
        "counterNumber"
    );

const counterText =
    document.getElementById(
        "counterText"
    );

let loveCount = 0;


counterHeart.onclick = () => {

    loveCount++;

    counterNumber.innerText =
        loveCount;

    counterHeart.style.transform =
        "scale(1.25)";

    setTimeout(() => {
        counterHeart.style.transform =
            "scale(1)";
    }, 150);


    if (loveCount < 5) {

        counterText.innerText =
            "A little more... ❤️";

    } else if (loveCount < 10) {

        counterText.innerText =
            "Okay... quite a lot ❤️";

    } else if (loveCount < 20) {

        counterText.innerText =
            "More than you know 🥺❤️";

    } else {

        counterNumber.innerText =
            "∞";

        counterText.innerText =
            "There. That's the answer. ❤️";

    }

};


/* =========================================
   STORY
========================================= */

document.getElementById("storyBtn").onclick = () => {
    showScreen("story-screen");
};

document.getElementById("memoriesBtn").onclick = () => {
    showScreen("memories-screen");
};


/* =========================================
   STORY CHAPTERS
========================================= */

document.querySelectorAll(".chapter").forEach(chapter => {

    chapter.onclick = () => {

        chapter.classList.toggle("expanded");

    };

});


/* =========================================
   MEMORIES
========================================= */

document.getElementById("loveBtn").onclick = () => {
    showScreen("love-screen");
};


/* =========================================
   LOVE CARDS
========================================= */

document.querySelectorAll(".love-box").forEach(box => {

    box.onclick = () => {

        box.classList.toggle("flipped");

    };

});


/* =========================================
   RAIN
========================================= */

document.getElementById("rainBtn").onclick = () => {
    showScreen("rain-screen");
};


/* =========================================
   LETTER
========================================= */

document.getElementById("letterBtn").onclick = () => {
    showScreen("letter-screen");
};


/* =========================================
   HIDDEN MESSAGES
========================================= */

function toggleMessage(buttonId, messageId) {

    document
        .getElementById(buttonId)
        .onclick = () => {

            document
                .getElementById(messageId)
                .classList.toggle("show");

        };

}

toggleMessage(
    "secretBtn",
    "secretMessage"
);

toggleMessage(
    "missBtn",
    "missMessage"
);

toggleMessage(
    "fightBtn",
    "fightMessage"
);


/* =========================================
   QUESTION
========================================= */

document.getElementById("questionBtn").onclick = () => {
    showScreen("question-screen");
};


function answerQuestion(text) {

    document.getElementById(
        "questionMessage"
    ).innerText = text;

    createFireworks();

    setTimeout(() => {

        showScreen("gift-screen");

    }, 1400);
}


document.getElementById("yesBtn").onclick = () => {

    answerQuestion(
        "I knew it. ❤️🥺"
    );

};


document.getElementById("yesMoreBtn").onclick = () => {

    answerQuestion(
        "That's exactly what I wanted to hear. ❤️"
    );

};


/* =========================================
   GIFT BOXES
========================================= */

const gifts =
    document.querySelectorAll(".gift-mini");

const giftReveal =
    document.getElementById("giftReveal");

const finalGiftBtn =
    document.getElementById("finalGiftBtn");

let openedGifts = 0;


gifts.forEach(gift => {

    gift.onclick = () => {

        if (gift.classList.contains("opened")) {
            return;
        }

        gift.classList.add("opened");

        openedGifts++;

        giftReveal.innerText =
            gift.dataset.message;

        createFireworks();

        if (openedGifts >= 3) {

            finalGiftBtn.classList.remove(
                "hidden"
            );

            giftReveal.innerText =
                "You opened all three... ❤️";

        }

    };

});


finalGiftBtn.onclick = () => {

    createFireworks();

    setTimeout(() => {

        showScreen("final-screen");

        bigCelebration();

    }, 800);

};


/* =========================================
   FIREWORKS
========================================= */

function createFireworks() {

    for (let i = 0; i < 35; i++) {

        const heart =
            document.createElement("div");

        heart.className =
            "firework-heart";

        heart.innerText =
            Math.random() > .5
                ? "❤️"
                : "💗";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.setProperty(
            "--x",
            `${(Math.random() - .5) * 600}px`
        );

        heart.style.setProperty(
            "--y",
            `${(Math.random() - .5) * 600}px`
        );

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1600);

    }

}


function bigCelebration() {

    for (let i = 0; i < 6; i++) {

        setTimeout(() => {
            createFireworks();
        }, i * 450);

    }

}


/* =========================================
   CURSOR HEART TRAIL
========================================= */

let lastHeart = 0;

document.addEventListener(
    "mousemove",
    event => {

        const now = Date.now();

        if (now - lastHeart < 120) {
            return;
        }

        lastHeart = now;

        const heart =
            document.createElement("span");

        heart.className =
            "cursor-heart";

        heart.innerText =
            Math.random() > .5
                ? "♥"
                : "♡";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        document
            .getElementById("cursorHearts")
            .appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 800);

    }
);


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("bgMusic");

const musicBtn =
    document.getElementById("musicBtn");

let musicPlaying = false;


musicBtn.onclick = () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicBtn.innerText =
                    "🔊";

            })
            .catch(() => {

                musicBtn.innerText =
                    "🎵";

            });

    } else {

        music.pause();

        musicPlaying = false;

        musicBtn.innerText =
            "🎵";

    }

};


/* =========================================
   REPLAY
========================================= */

document.getElementById("replayBtn").onclick = () => {

    location.reload();

};


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            document
                .querySelectorAll(".screen")
                .forEach(screen => {

                    if (
                        screen.id ===
                        "final-screen"
                    ) {
                        return;
                    }

                });

        }

    }
);