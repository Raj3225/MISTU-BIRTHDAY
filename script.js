/* =========================================
   VARIABLES
========================================= */

let cameraStream = null;

let scanning = false;

let video = null;

let canvas = null;

let canvasContext = null;

let score = 0;

let timeLeft = 20;

let gameTimer = null;

let gameRunning = false;


/* =========================================
   SHOW SCREEN
========================================= */

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(function(screen) {

        screen.classList.remove("active");

    });

    const target =
        document.getElementById(screenId);

    if (target) {

        target.classList.add("active");

    }
}


/* =========================================
   START CAMERA
========================================= */

async function startScanner() {

    video =
        document.getElementById("camera");

    canvas =
        document.getElementById("qr-canvas");

    canvasContext =
        canvas.getContext("2d");

    const status =
        document.getElementById("scanner-status");

    const button =
        document.getElementById("start-camera-btn");


    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        status.innerText =
            "Camera is not supported by this browser.";

        return;
    }


    try {

        status.innerText =
            "Opening camera... 📷";

        button.disabled = true;


        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {

                    facingMode: {
                        ideal: "environment"
                    }

                },

                audio: false

            });


        video.srcObject =
            cameraStream;


        await video.play();


        scanning = true;


        status.innerText =
            "Point your camera at the QR code ❤️";


        scanQRCode();


    } catch (error) {

        console.error(error);

        button.disabled = false;

        status.innerText =
            "Please allow camera permission 📷";

    }
}


/* =========================================
   SCAN QR
========================================= */

function scanQRCode() {

    if (!scanning) {
        return;
    }


    if (video.readyState ===
        video.HAVE_ENOUGH_DATA) {


        canvas.width =
            video.videoWidth;

        canvas.height =
            video.videoHeight;


        canvasContext.drawImage(

            video,

            0,
            0,

            canvas.width,
            canvas.height

        );


        const imageData =
            canvasContext.getImageData(

                0,
                0,

                canvas.width,
                canvas.height

            );


        const code =
            jsQR(

                imageData.data,

                imageData.width,

                imageData.height

            );


        if (code) {

            handleQRCode(code.data);

            return;
        }
    }


    requestAnimationFrame(scanQRCode);
}


/* =========================================
   QR FOUND
========================================= */

function handleQRCode(data) {

    console.log(
        "QR code detected:",
        data
    );


    scanning = false;

    stopCamera();


    document.getElementById(
        "scanner-status"
    ).innerText =
        "QR scanned successfully! ❤️";


    setTimeout(function() {

        showScreen("password-screen");


        const input =
            document.getElementById(
                "password-input"
            );


        if (input) {
            input.focus();
        }

    }, 700);
}


/* =========================================
   STOP CAMERA
========================================= */

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(function(track) {

                track.stop();

            });

        cameraStream = null;
    }


    if (video) {

        video.srcObject = null;

    }
}


/* =========================================
   PASSWORD
========================================= */

function checkPassword() {

    const input =
        document.getElementById(
            "password-input"
        );

    const message =
        document.getElementById(
            "password-message"
        );


    const password =
        input.value.trim();


    if (password === "29thmarch") {

        message.innerText =
            "Correct password! ❤️";


        setTimeout(function() {

            showScreen("game-screen");

        }, 700);


    } else {

        message.innerText =
            "Wrong password 💔";

        input.value = "";

        input.focus();

    }
}


/* =========================================
   ENTER PASSWORD WITH ENTER KEY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById(
                "password-input"
            );


        input.addEventListener(
            "keydown",
            function(event) {

                if (event.key === "Enter") {

                    checkPassword();

                }

            }
        );

    }
);


/* =========================================
   START GAME
========================================= */

function startGame() {

    if (gameRunning) {
        return;
    }


    score = 0;

    timeLeft = 20;

    gameRunning = true;


    document.getElementById(
        "score"
    ).innerText = score;


    document.getElementById(
        "timer"
    ).innerText = timeLeft;


    document.getElementById(
        "game-message"
    ).innerText = "";


    document.getElementById(
        "start-game-btn"
    ).style.display = "none";


    const gameArea =
        document.getElementById(
            "game-area"
        );


    gameArea.innerHTML = "";


    gameTimer =
        setInterval(function() {

            timeLeft--;

            document.getElementById(
                "timer"
            ).innerText = timeLeft;


            if (timeLeft <= 0) {

                endGame();

            }

        }, 1000);


    createHeart();
}


/* =========================================
   CREATE HEART
========================================= */

function createHeart() {

    if (!gameRunning) {
        return;
    }


    const gameArea =
        document.getElementById(
            "game-area"
        );


    const heart =
        document.createElement("div");


    heart.className =
        "game-heart";


    heart.innerText =
        "❤️";


    const maxX =
        gameArea.clientWidth - 50;

    const maxY =
        gameArea.clientHeight - 50;


    heart.style.left =
        Math.random() * maxX + "px";


    heart.style.top =
        Math.random() * maxY + "px";


    heart.onclick =
        function() {

            if (!gameRunning) {
                return;
            }


            score++;


            document.getElementById(
                "score"
            ).innerText = score;


            heart.remove();


            if (score >= 5) {

                winGame();

            } else {

                createHeart();

            }

        };


    gameArea.appendChild(heart);
}


/* =========================================
   WIN GAME
========================================= */

function winGame() {

    gameRunning = false;

    clearInterval(gameTimer);


    document.getElementById(
        "game-message"
    ).innerText =
        "You caught all the hearts! ❤️";


    setTimeout(function() {

        showScreen(
            "birthday-screen"
        );

    }, 1000);
}


/* =========================================
   GAME OVER
========================================= */

function endGame() {

    gameRunning = false;

    clearInterval(gameTimer);


    document.getElementById(
        "game-message"
    ).innerText =
        "Time's up! Try again ❤️";


    document.getElementById(
        "start-game-btn"
    ).style.display = "inline-block";


    document.getElementById(
        "start-game-btn"
    ).innerText =
        "Try Again 💕";
}


/* =========================================
   ALWAYS START WITH SCANNER
========================================= */

window.addEventListener(
    "load",
    function() {

        showScreen(
            "scanner-screen"
        );

    }
);