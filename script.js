/* ==========================================
   SCREEN SYSTEM
========================================== */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ==========================================
   PASSWORD
========================================== */

const passwordInput = document.getElementById("password");
const passwordButton = document.getElementById("passwordBtn");
const passwordMessage = document.getElementById("passwordMessage");

function checkPassword() {

    const enteredPassword =
        passwordInput.value.trim();

    if (enteredPassword === "29thmarch") {

        passwordMessage.innerText =
            "Welcome, Mistu ❤️";

        passwordButton.disabled = true;
        passwordInput.disabled = true;

        setTimeout(function() {

            showScreen("game-screen");

            startGame();

        }, 900);

    } else {

        passwordMessage.innerText =
            "Almost... try again 😜";

        passwordInput.value = "";

        passwordInput.focus();
    }
}

passwordButton.addEventListener(
    "click",
    checkPassword
);

passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            checkPassword();
        }

    }
);

passwordInput.addEventListener(
    "input",
    function() {

        passwordMessage.innerText = "";

    }
);


/* ==========================================
   HEART GAME
========================================== */

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

    scoreText.innerText = "0 / 5";

    gameMessage.innerText =
        "Tap the glowing heart ❤️";

    moveHeart();
}


function moveHeart() {

    if (!gameRunning) {
        return;
    }

    const areaWidth =
        gameArea.clientWidth;

    const areaHeight =
        gameArea.clientHeight;

    const heartWidth =
        heart.offsetWidth;

    const heartHeight =
        heart.offsetHeight;

    const maxX =
        Math.max(
            0,
            areaWidth - heartWidth
        );

    const maxY =
        Math.max(
            0,
            areaHeight - heartHeight
        );

    const randomX =
        Math.floor(
            Math.random() *
            (maxX + 1)
        );

    const randomY =
        Math.floor(
            Math.random() *
            (maxY + 1)
        );

    heart.style.left =
        randomX + "px";

    heart.style.top =
        randomY + "px";
}


heart.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        if (!gameRunning) {
            return;
        }

        score++;

        scoreText.innerText =
            score + " / 5";


        if (score === 1) {

            gameMessage.innerText =
                "Yay! Keep going 💕";

        }

        if (score === 2) {

            gameMessage.innerText =
                "You're good at this 😍";

        }

        if (score === 3) {

            gameMessage.innerText =
                "Three already! ❤️";

        }

        if (score === 4) {

            gameMessage.innerText =
                "One more, Mistu... 🥰";

        }


        if (score >= 5) {

            gameRunning = false;

            heart.style.display =
                "none";

            gameMessage.innerText =
                "You caught all my hearts! ❤️";

            createHeartExplosion();

            setTimeout(
                function() {

                    showScreen(
                        "birthday-screen"
                    );

                },
                1500
            );

            return;
        }

        moveHeart();

    }
);


/* ==========================================
   HEART EXPLOSION
========================================== */

function createHeartExplosion() {

    for (let i = 0; i < 25; i++) {

        const heartParticle =
            document.createElement("div");

        heartParticle.className =
            "heart-particle";

        heartParticle.innerText =
            Math.random() > 0.5
                ? "❤️"
                : "💕";

        heartParticle.style.left =
            Math.random() * 100 + "%";

        heartParticle.style.top =
            Math.random() * 100 + "%";

        heartParticle.style.animationDelay =
            Math.random() * 0.5 + "s";

        document.body.appendChild(
            heartParticle
        );

        setTimeout(
            function() {
                heartParticle.remove();
            },
            2200
        );
    }
}


/* ==========================================
   PAGE NAVIGATION
========================================== */

document
    .getElementById("memoriesBtn")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "memories-screen"
            );

        }
    );


document
    .getElementById("storyBtn")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "story-screen"
            );

        }
    );


document
    .getElementById("reasonsBtn")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "reasons-screen"
            );

        }
    );


document
    .getElementById("promiseBtn")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "promise-screen"
            );

        }
    );


document
    .getElementById("letterBtn")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "letter-screen"
            );

        }
    );


document
    .getElementById("surpriseBtn")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "surprise-screen"
            );

        }
    );


/* ==========================================
   REASONS I LOVE YOU
========================================== */

const reasons = [

    "Your eyes. ❤️",

    "The way you care about me. 💕",

    "The way you console me whenever I'm not okay. 🥺",

    "Your smile. It can change my entire mood. 😊",

    "The way you behave and the person you are. ❤️",

    "Your patience with me. 🌷",

    "The little things you do that you probably don't even notice. 💗",

    "Simply because you're Mistu. And there is only one you. ❤️"

];

let reasonIndex = 0;

const reasonText =
    document.getElementById("reasonText");

const reasonNumber =
    document.getElementById("reasonNumber");

const reasonDots =
    document.getElementById("reasonDots");

const reasonHeart =
    document.getElementById("reasonHeart");

const reasonButton =
    document.getElementById("reasonBtn");


function updateReason() {

    reasonText.classList.remove(
        "reason-change"
    );

    reasonHeart.classList.remove(
        "heart-pop"
    );

    void reasonText.offsetWidth;

    reasonText.innerText =
        reasons[reasonIndex];

    reasonNumber.innerText =
        (reasonIndex + 1) +
        " / " +
        reasons.length;

    let dots = "";

    for (
        let i = 0;
        i < reasons.length;
        i++
    ) {

        dots +=
            i === reasonIndex
                ? "● "
                : "○ ";

    }

    reasonDots.innerText =
        dots;

    reasonText.classList.add(
        "reason-change"
    );

    reasonHeart.classList.add(
        "heart-pop"
    );
}


reasonButton.addEventListener(
    "click",
    function() {

        reasonIndex++;

        if (
            reasonIndex >=
            reasons.length
        ) {

            reasonIndex = 0;

        }

        updateReason();

    }
);


/* ==========================================
   GIFT BOX
========================================== */

const giftBox =
    document.getElementById("giftBox");

const openGiftBtn =
    document.getElementById(
        "openGiftBtn"
    );

const giftMessage =
    document.getElementById(
        "giftMessage"
    );


openGiftBtn.addEventListener(
    "click",
    function() {

        giftBox.classList.add(
            "gift-open"
        );

        giftMessage.innerText =
            "You are one of the most special people in my life. ❤️";

        openGiftBtn.innerText =
            "Open My Heart ❤️";

        openGiftBtn.disabled = true;

        createHeartExplosion();

        setTimeout(
            function() {

                showScreen(
                    "final-screen"
                );

            },
            2800
        );

    }
);


/* ==========================================
   RESIZE GAME
========================================== */

window.addEventListener(
    "resize",
    function() {

        if (gameRunning) {
            moveHeart();
        }

    }
);