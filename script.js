function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    selectedScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= PASSWORD ================= */

const passwordInput = document.getElementById("password");
const passwordButton = document.getElementById("passwordBtn");
const passwordMessage = document.getElementById("passwordMessage");


function checkPassword() {

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === "29thmarch") {

        passwordMessage.innerText = "Welcome, Mistu ❤️";

        passwordButton.disabled = true;
        passwordInput.disabled = true;

        setTimeout(function() {

            showScreen("game-screen");

            startGame();

        }, 1000);

    } else {

        passwordMessage.innerText = "Almost... try again 😜";

        passwordInput.value = "";

        passwordInput.focus();
    }
}


passwordButton.addEventListener("click", checkPassword);


passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        checkPassword();

    }

});


/* ================= HEART GAME ================= */

const gameArea = document.getElementById("game-area");

const heart = document.getElementById("heart");

const scoreText = document.getElementById("score");

const gameMessage = document.getElementById("game-message");


let score = 0;

let gameRunning = false;


function startGame() {

    score = 0;

    gameRunning = true;

    heart.style.display = "flex";

    scoreText.innerText = "0 / 5";

    gameMessage.innerText = "Tap the glowing heart ❤️";

    moveHeart();
}


function moveHeart() {

    if (!gameRunning) return;

    const areaWidth = gameArea.clientWidth;

    const areaHeight = gameArea.clientHeight;

    const heartWidth = heart.offsetWidth;

    const heartHeight = heart.offsetHeight;


    const maxX = Math.max(
        0,
        areaWidth - heartWidth
    );


    const maxY = Math.max(
        0,
        areaHeight - heartHeight
    );


    const randomX = Math.floor(
        Math.random() * (maxX + 1)
    );


    const randomY = Math.floor(
        Math.random() * (maxY + 1)
    );


    heart.style.left = randomX + "px";

    heart.style.top = randomY + "px";
}


heart.addEventListener("click", function(event) {

    event.preventDefault();

    if (!gameRunning) return;


    score++;

    scoreText.innerText = score + " / 5";


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

        heart.style.display = "none";

        gameMessage.innerText =
            "You caught all my hearts! ❤️";


        setTimeout(function() {

            showScreen("birthday-screen");

        }, 1200);


        return;
    }


    moveHeart();

});


/* ================= NAVIGATION ================= */

document
    .getElementById("memoriesBtn")
    .addEventListener("click", function() {

        showScreen("memories-screen");

    });


document
    .getElementById("letterBtn")
    .addEventListener("click", function() {

        showScreen("letter-screen");

    });


document
    .getElementById("finalBtn")
    .addEventListener("click", function() {

        showScreen("final-screen");

    });


/* ================= PASSWORD INPUT ================= */

passwordInput.addEventListener("input", function() {

    passwordMessage.innerText = "";

});