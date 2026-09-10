/* =========================================================
   MISTU BIRTHDAY WEBSITE
========================================================= */


/* =========================================================
   SCREEN CHANGER
========================================================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });


    const selectedScreen =
        document.getElementById(screenId);


    if (selectedScreen) {

        selectedScreen.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   PASSWORD
========================================================= */

const passwordInput =
    document.getElementById("password");

const passwordButton =
    document.getElementById("passwordBtn");

const passwordMessage =
    document.getElementById("passwordMessage");


function checkPassword() {

    const enteredPassword =
        passwordInput.value.trim();


    if (enteredPassword === "29thmarch") {

        passwordMessage.innerText =
            "Welcome, Mistu ❤️";


        passwordMessage.classList.add(
            "success-message"
        );


        passwordButton.disabled = true;

        passwordInput.disabled = true;


        setTimeout(function() {

            showScreen("game-screen");

            startGame();

        }, 1000);

    }

    else {

        passwordMessage.innerText =
            "Almost... try again 😜";


        passwordMessage.classList.remove(
            "success-message"
        );


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


/* =========================================================
   HEART GAME
========================================================= */

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


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    score = 0;

    gameRunning = true;


    heart.style.display = "flex";


    scoreText.innerText =
        "0 / 5";


    gameMessage.innerText =
        "Tap the glowing heart ❤️";


    moveHeart();

}


/* =========================================================
   MOVE HEART
========================================================= */

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


/* =========================================================
   HEART CLICK
========================================================= */

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
                "One more! 🥰";

        }


        if (score >= 5) {

            gameRunning = false;


            heart.style.display =
                "none";


            gameMessage.innerText =
                "You caught all my hearts! ❤️";


            setTimeout(function() {

                showScreen(
                    "birthday-screen"
                );

            }, 1200);


            return;

        }


        moveHeart();

    }
);


/* =========================================================
   MEMORIES BUTTON
========================================================= */

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


/* =========================================================
   LETTER BUTTON
========================================================= */

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


/* =========================================================
   FINAL BUTTON
========================================================= */

document
    .getElementById("finalBtn")
    .addEventListener(
        "click",
        function() {

            showScreen(
                "final-screen"
            );


            launchConfetti();

        }
    );


/* =========================================================
   RESTART BUTTON
========================================================= */

document
    .getElementById("restartBtn")
    .addEventListener(
        "click",
        function() {

            passwordInput.disabled = false;

            passwordButton.disabled = false;

            passwordInput.value = "";

            passwordMessage.innerText = "";

            score = 0;

            gameRunning = false;

            heart.style.display = "flex";

            showScreen(
                "password-screen"
            );

        }
    );


/* =========================================================
   CONFETTI
========================================================= */

function launchConfetti() {

    const container =
        document.getElementById(
            "confetti-container"
        );


    container.innerHTML = "";


    const pieces = 100;


    for (
        let i = 0;
        i < pieces;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.classList.add(
            "confetti"
        );


        confetti.style.left =
            Math.random() * 100 + "%";


        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        confetti.style.animationDuration =
            2.5 +
            Math.random() * 2 +
            "s";


        const size =
            6 +
            Math.random() * 8;


        confetti.style.width =
            size + "px";


        confetti.style.height =
            size * 1.5 + "px";


        container.appendChild(
            confetti
        );

    }


    setTimeout(function() {

        container.innerHTML = "";

    }, 6000);

}


/* =========================================================
   CLICKING LOVE REASON CARDS
========================================================= */

const reasonCards =
    document.querySelectorAll(
        ".reason-card"
    );


reasonCards.forEach(
    function(card) {

        card.addEventListener(
            "click",
            function() {

                card.classList.toggle(
                    "reason-selected"
                );

            }
        );

    }
);


/* =========================================================
   RESIZE SAFETY FOR HEART GAME
========================================================= */

window.addEventListener(
    "resize",
    function() {

        if (gameRunning) {

            moveHeart();

        }

    }
);