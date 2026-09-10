/* =========================================
   SCREEN SYSTEM
========================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const screen =
        document.getElementById(id);

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

document
    .getElementById("startBtn")
    .addEventListener("click", function () {

        showScreen("password-screen");

    });


/* =========================================
   PASSWORD
========================================= */

const passwordInput =
    document.getElementById("password");

const passwordBtn =
    document.getElementById("passwordBtn");

const passwordMessage =
    document.getElementById("passwordMessage");


function checkPassword() {

    const password =
        passwordInput.value.trim();

    if (password === "29thmarch") {

        passwordMessage.innerText =
            "Welcome, Mistu ❤️";

        passwordBtn.disabled = true;

        passwordInput.disabled = true;

        setTimeout(() => {

            showScreen("envelope-screen");

        }, 900);

    } else {

        passwordMessage.innerText =
            "Almost... try again 😜";

        passwordInput.value = "";

        passwordInput.focus();

    }
}


passwordBtn.addEventListener(
    "click",
    checkPassword
);


passwordInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            checkPassword();

        }

    }
);


passwordInput.addEventListener(
    "input",
    function () {

        passwordMessage.innerText = "";

    }
);


/* =========================================
   ENVELOPE
========================================= */

const envelope =
    document.getElementById("envelope");


envelope.addEventListener(
    "click",
    function () {

        if (
            envelope.classList.contains("open")
        ) {
            return;
        }

        envelope.classList.add("open");

        setTimeout(() => {

            showScreen("game-screen");

            startGame();

        }, 1800);

    }
);


/* =========================================
   HEART GAME
========================================= */

const gameArea =
    document.getElementById("game-area");

const heart =
    document.getElementById("heart");

const scoreText =
    document.getElementById("score");

const gameMessage =
    document.getElementById("game-message");

let score = 0;

let gameRunning = false;


function startGame() {

    score = 0;

    gameRunning = true;

    heart.style.display = "flex";

    scoreText.innerText =
        "0 / 5";

    gameMessage.innerText =
        "Catch the glowing heart ❤️";

    moveHeart();
}


function moveHeart() {

    if (!gameRunning) {
        return;
    }

    const width =
        gameArea.clientWidth;

    const height =
        gameArea.clientHeight;

    const heartSize =
        heart.offsetWidth;

    const maxX =
        Math.max(
            0,
            width - heartSize
        );

    const maxY =
        Math.max(
            0,
            height - heartSize
        );

    heart.style.left =
        Math.random() * maxX + "px";

    heart.style.top =
        Math.random() * maxY + "px";
}


heart.addEventListener(
    "click",
    function () {

        if (!gameRunning) {
            return;
        }

        createGameHearts();

        score++;

        scoreText.innerText =
            score + " / 5";


        const messages = [
            "Yay! Keep going 💕",
            "You're good at this 😍",
            "Three already! ❤️",
            "One more! 🥰",
            "You caught all my hearts! ❤️"
        ];

        gameMessage.innerText =
            messages[Math.min(score - 1, 4)];


        if (score >= 5) {

            gameRunning = false;

            heart.style.display =
                "none";

            setTimeout(() => {

                showScreen("cake-screen");

            }, 1300);

        } else {

            moveHeart();

        }

    }
);


function createGameHearts() {

    for (let i = 0; i < 6; i++) {

        const h =
            document.createElement("div");

        h.innerText =
            "❤️";

        h.className =
            "heart-pop";

        h.style.position =
            "absolute";

        h.style.left =
            heart.offsetLeft +
            Math.random() * 50 +
            "px";

        h.style.top =
            heart.offsetTop +
            Math.random() * 50 +
            "px";

        gameArea.appendChild(h);

        setTimeout(() => {

            h.remove();

        }, 700);

    }
}


/* =========================================
   CAKE
========================================= */

const flame =
    document.getElementById("flame");

const blowBtn =
    document.getElementById("blowBtn");

const cakeMessage =
    document.getElementById("cakeMessage");


blowBtn.addEventListener(
    "click",
    function () {

        flame.classList.add("off");

        cakeMessage.innerText =
            "Wish made! ✨❤️";

        blowBtn.innerText =
            "Wish Sent ❤️";

        blowBtn.disabled = true;

        setTimeout(() => {

            showScreen("birthday-screen");

            startTyping();

        }, 1700);

    }
);


/* =========================================
   TYPING
========================================= */

const typingText =
    document.getElementById("typing-text");


const birthdayText =
    "You are one of the most special people in my life. Today is all about celebrating YOU. I hope this little surprise makes you smile. ❤️";


let typingStarted = false;


function startTyping() {

    if (typingStarted) {
        return;
    }

    typingStarted = true;

    typingText.innerText = "";

    let index = 0;

    const interval =
        setInterval(() => {

            typingText.innerText +=
                birthdayText[index];

            index++;

            if (
                index >=
                birthdayText.length
            ) {

                clearInterval(interval);

            }

        }, 35);
}


/* =========================================
   STORY
========================================= */

document
    .getElementById("storyBtn")
    .addEventListener(
        "click",
        function () {

            showScreen("story-screen");

        }
    );


/* =========================================
   MEMORIES
========================================= */

document
    .getElementById("memoriesBtn")
    .addEventListener(
        "click",
        function () {

            showScreen("memories-screen");

        }
    );


/* =========================================
   SLIDESHOW
========================================= */

const slideImage =
    document.getElementById("slideImage");

const slideCaption =
    document.getElementById("slideCaption");

const dots =
    document.querySelectorAll(".dot");


const slideData = [

    {
        image: "images/photo1.jpg",
        caption: "A beautiful moment ❤️"
    },

    {
        image: "images/photo2.jpg",
        caption: "One to remember 💕"
    },

    {
        image: "images/photo3.jpg",
        caption: "Just us ❤️"
    },

    {
        image: "images/photo4.jpg",
        caption: "A moment I'll treasure 💗"
    }

];


let currentSlide = 0;


function updateSlide() {

    slideImage.src =
        slideData[currentSlide].image;

    slideCaption.innerText =
        slideData[currentSlide].caption;


    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        }
    );

}


document
    .getElementById("nextPhoto")
    .addEventListener(
        "click",
        function () {

            currentSlide++;

            if (
                currentSlide >=
                slideData.length
            ) {
                currentSlide = 0;
            }

            updateSlide();

        }
    );


document
    .getElementById("prevPhoto")
    .addEventListener(
        "click",
        function () {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide =
                    slideData.length - 1;
            }

            updateSlide();

        }
    );


setInterval(
    function () {

        if (
            document
                .getElementById("memories-screen")
                .classList.contains("active")
        ) {

            currentSlide++;

            if (
                currentSlide >=
                slideData.length
            ) {

                currentSlide = 0;

            }

            updateSlide();

        }

    },
    4000
);


/* =========================================
   PHOTO VIEWER
========================================= */

const photoViewer =
    document.getElementById(
        "photoViewer"
    );

const viewerImage =
    document.getElementById(
        "viewerImage"
    );

const viewerCaption =
    document.getElementById(
        "viewerCaption"
    );


document
    .querySelectorAll(".photo-box img")
    .forEach(
        photo => {

            photo.addEventListener(
                "click",
                function () {

                    viewerImage.src =
                        photo.src;

                    viewerCaption.innerText =
                        photo
                            .closest(".photo-card")
                            .querySelector(
                                ".photo-caption"
                            )
                            .innerText;

                    photoViewer.classList.add(
                        "active"
                    );

                }
            );

        }
    );


document
    .getElementById("closeViewer")
    .addEventListener(
        "click",
        function () {

            photoViewer.classList.remove(
                "active"
            );

        }
    );


photoViewer.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            photoViewer
        ) {

            photoViewer.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   LOVE CARDS
========================================= */

document
    .querySelectorAll(".love-box")
    .forEach(
        box => {

            box.addEventListener(
                "click",
                function () {

                    box.classList.toggle(
                        "flipped"
                    );

                }
            );

        }
    );


document
    .getElementById("loveBtn")
    .addEventListener(
        "click",
        function () {

            showScreen("love-screen");

        }
    );


/* =========================================
   RAIN
========================================= */

document
    .getElementById("rainBtn")
    .addEventListener(
        "click",
        function () {

            showScreen("rain-screen");

        }
    );


/* =========================================
   LETTER
========================================= */

document
    .getElementById("letterBtn")
    .addEventListener(
        "click",
        function () {

            showScreen("letter-screen");

        }
    );


/* =========================================
   SECRET MESSAGE
========================================= */

document
    .getElementById("secretBtn")
    .addEventListener(
        "click",
        function () {

            const message =
                document.getElementById(
                    "secretMessage"
                );

            message.classList.toggle(
                "show"
            );

        }
    );


/* =========================================
   MISS ME
========================================= */

document
    .getElementById("missBtn")
    .addEventListener(
        "click",
        function () {

            const message =
                document.getElementById(
                    "missMessage"
                );

            message.classList.toggle(
                "show"
            );

        }
    );


/* =========================================
   QUESTION
========================================= */

document
    .getElementById("questionBtn")
    .addEventListener(
        "click",
        function () {

            showScreen("question-screen");

        }
    );


const questionMessage =
    document.getElementById(
        "questionMessage"
    );


function answerYes(message) {

    questionMessage.innerText =
        message;

    createFireworks();

    setTimeout(() => {

        showScreen("gift-screen");

    }, 1500);

}


document
    .getElementById("yesBtn")
    .addEventListener(
        "click",
        function () {

            answerYes(
                "I knew it. ❤️🥺"
            );

        }
    );


document
    .getElementById("yesMoreBtn")
    .addEventListener(
        "click",
        function () {

            answerYes(
                "That's the answer I was hoping for. 🥺❤️"
            );

        }
    );


/* =========================================
   GIFT
========================================= */

const giftBox =
    document.getElementById("giftBox");

const giftText =
    document.getElementById("giftText");


giftBox.addEventListener(
    "click",
    function () {

        if (
            giftBox.classList.contains("open")
        ) {
            return;
        }

        giftBox.classList.add("open");

        giftText.innerText =
            "A whole lot of love is waiting inside... ❤️";

        createFireworks();

        setTimeout(() => {

            showScreen("final-screen");

            createBigCelebration();

        }, 1800);

    }
);


/* =========================================
   FIREWORKS
========================================= */

function createFireworks() {

    for (let i = 0; i < 30; i++) {

        const h =
            document.createElement("div");

        h.className =
            "firework-heart";

        h.innerText =
            Math.random() > .5
                ? "❤️"
                : "💗";

        h.style.left =
            "50%";

        h.style.top =
            "50%";

        const x =
            (Math.random() - .5) *
            500;

        const y =
            (Math.random() - .5) *
            500;

        h.style.setProperty(
            "--x",
            x + "px"
        );

        h.style.setProperty(
            "--y",
            y + "px"
        );

        document.body.appendChild(h);

        setTimeout(() => {

            h.remove();

        }, 1600);

    }
}


/* =========================================
   BIG FINAL CELEBRATION
========================================= */

function createBigCelebration() {

    for (let round = 0; round < 4; round++) {

        setTimeout(
            createFireworks,
            round * 500
        );

    }

}


/* =========================================
   CURSOR HEART TRAIL
========================================= */

let lastCursorHeart = 0;


document.addEventListener(
    "mousemove",
    function (event) {

        const now =
            Date.now();

        if (
            now - lastCursorHeart < 100
        ) {
            return;
        }

        lastCursorHeart =
            now;

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
            .getElementById(
                "cursorHearts"
            )
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
    document.getElementById(
        "bgMusic"
    );

const musicBtn =
    document.getElementById(
        "musicBtn"
    );

let musicPlaying = false;


musicBtn.addEventListener(
    "click",
    function () {

        if (!musicPlaying) {

            music.play()
                .then(() => {

                    musicPlaying =
                        true;

                    musicBtn.innerText =
                        "🔊";

                })
                .catch(() => {

                    musicBtn.innerText =
                        "🎵";

                });

        } else {

            music.pause();

            musicPlaying =
                false;

            musicBtn.innerText =
                "🎵";

        }

    }
);


/* =========================================
   REPLAY
========================================= */

document
    .getElementById("replayBtn")
    .addEventListener(
        "click",
        function () {

            location.reload();

        }
    );


/* =========================================
   ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            photoViewer.classList.remove(
                "active"
            );

        }

    }
);