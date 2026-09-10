/* ========================================= */
/* PASSWORD */
/* ========================================= */

const SECRET_PASSWORD = "29thmarch";


/* ========================================= */
/* CAMERA VARIABLES */
/* ========================================= */

let video = null;

let canvas = null;

let canvasContext = null;

let cameraStream = null;

let scanning = false;


/* ========================================= */
/* START CAMERA SCANNER */
/* ========================================= */

async function startScanner() {

    video =
        document.getElementById("camera");

    canvas =
        document.getElementById("qr-canvas");

    canvasContext =
        canvas.getContext("2d");


    const status =
        document.getElementById(
            "scanner-status"
        );


    try {

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


        scanning = true;


        status.innerText =
            "Point your camera at the QR code ❤️";


        scanQRCode();


    } catch (error) {

        console.error(error);


        status.innerText =
            "Camera permission is required 📷";


    }

}


/* ========================================= */
/* SCAN QR CODE */
/* ========================================= */

function scanQRCode() {

    if (!scanning) {
        return;
    }


    if (
        video.readyState ===
        video.HAVE_ENOUGH_DATA
    ) {

        canvas.height =
            video.videoHeight;


        canvas.width =
            video.videoWidth;


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

            console.log(
                "QR detected:",
                code.data
            );


            handleQRCode(
                code.data
            );


            return;

        }

    }


    requestAnimationFrame(
        scanQRCode
    );

}


/* ========================================= */
/* WHEN QR IS SCANNED */
/* ========================================= */

function handleQRCode(data) {

    scanning = false;


    stopCamera();


    const status =
        document.getElementById(
            "scanner-status"
        );


    status.innerText =
        "QR scanned successfully ❤️";


    /*
        Any QR code can trigger the
        password screen.

        This means you can create your
        own special QR code for Mistu.
    */


    setTimeout(() => {

        showScreen(
            "password-screen"
        );


        const input =
            document.getElementById(
                "password-input"
            );


        if (input) {

            input.focus();

        }

    }, 500);

}


/* ========================================= */
/* STOP CAMERA */
/* ========================================= */

function stopCamera() {

    scanning = false;


    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => {

                track.stop();

            });


        cameraStream = null;

    }

}


/* ========================================= */
/* PASSWORD */
/* ========================================= */

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


    if (
        password ===
        SECRET_PASSWORD
    ) {

        message.innerText =
            "Correct ❤️";


        setTimeout(() => {

            showScreen(
                "game-screen"
            );


            resetGame();

        }, 700);


    } else {

        message.innerText =
            "Wrong password 😜 Try again!";


        input.value = "";

        input.focus();

    }

}


/* ========================================= */
/* ENTER KEY */
/* ========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const passwordScreen =
            document.getElementById(
                "password-screen"
            );


        if (
            event.key === "Enter" &&
            passwordScreen.classList.contains(
                "active"
            )
        ) {

            checkPassword();

        }

    }
);


/* ========================================= */
/* SCREEN SYSTEM */
/* ========================================= */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


    const screen =
        document.getElementById(
            screenId
        );


    if (screen) {

        screen.classList.add(
            "active"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* ========================================= */
/* GAME VARIABLES */
/* ========================================= */

let score = 0;

let timeLeft = 20;

let gameTimer = null;

let heartButton = null;


/* ========================================= */
/* RESET GAME */
/* ========================================= */

function resetGame() {

    score = 0;

    timeLeft = 20;


    document.getElementById(
        "score"
    ).innerText = score;


    document.getElementById(
        "timer"
    ).innerText = timeLeft;


    document.getElementById(
        "game-message"
    ).innerText =
        "Catch the hearts! 💕";


    heartButton =
        document.getElementById(
            "heart"
        );


    moveHeart();


    clearInterval(
        gameTimer
    );


    gameTimer =
        setInterval(() => {

            timeLeft--;


            document.getElementById(
                "timer"
            ).innerText =
                timeLeft;


            if (
                timeLeft <= 0
            ) {

                clearInterval(
                    gameTimer
                );


                if (
                    score >= 5
                ) {

                    showBirthday();

                } else {

                    document.getElementById(
                        "game-message"
                    ).innerText =
                        "Time's up! Try again ❤️";


                    setTimeout(() => {

                        resetGame();

                    }, 1500);

                }

            }

        }, 1000);

}


/* ========================================= */
/* CATCH HEART */
/* ========================================= */

function catchHeart() {

    score++;


    document.getElementById(
        "score"
    ).innerText =
        score;


    createHeartEffect();


    if (
        score >= 5
    ) {

        clearInterval(
            gameTimer
        );


        document.getElementById(
            "game-message"
        ).innerText =
            "You did it! ❤️";


        setTimeout(() => {

            showBirthday();

        }, 900);


        return;

    }


    moveHeart();

}


/* ========================================= */
/* MOVE HEART */
/* ========================================= */

function moveHeart() {

    if (!heartButton) {

        heartButton =
            document.getElementById(
                "heart"
            );

    }


    const area =
        document.getElementById(
            "game-area"
        );


    if (
        !area ||
        !heartButton
    ) {

        return;

    }


    const maxX =
        area.clientWidth - 70;


    const maxY =
        area.clientHeight - 70;


    const x =
        Math.random() *
        Math.max(
            maxX,
            10
        );


    const y =
        Math.random() *
        Math.max(
            maxY,
            10
        );


    heartButton.style.left =
        x + "px";


    heartButton.style.top =
        y + "px";

}


/* ========================================= */
/* BIRTHDAY */
/* ========================================= */

function showBirthday() {

    showScreen(
        "birthday-screen"
    );


    celebration();

}


/* ========================================= */
/* MEMORIES */
/* ========================================= */

function showMemories() {

    showScreen(
        "memories-screen"
    );

}


/* ========================================= */
/* LOVE */
/* ========================================= */

function showLove() {

    showScreen(
        "love-screen"
    );

}


/* ========================================= */
/* FINAL */
/* ========================================= */

function showFinal() {

    showScreen(
        "final-screen"
    );


    celebration();

}


/* ========================================= */
/* HEART EFFECT */
/* ========================================= */

function createHeartEffect() {

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.innerText =
            "❤️";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() *
            100 +
            "%";


        heart.style.top =
            Math.random() *
            100 +
            "%";


        heart.style.fontSize =
            Math.random() *
            25 +
            15 +
            "px";


        heart.style.pointerEvents =
            "none";


        heart.style.zIndex =
            "999";


        heart.style.animation =
            "floatUp 2s linear forwards";


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 2000);

    }

}


/* ========================================= */
/* CELEBRATION */
/* ========================================= */

function celebration() {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        setTimeout(() => {

            createHeartEffect();

        }, i * 100);

    }

}


/* ========================================= */
/* BACKGROUND HEARTS */
/* ========================================= */

function createFloatingHeart() {

    const container =
        document.getElementById(
            "hearts-container"
        );


    if (!container) {
        return;
    }


    const heart =
        document.createElement(
            "div"
        );


    heart.classList.add(
        "floating-heart"
    );


    heart.innerText =
        Math.random() > 0.5
            ? "❤️"
            : "💕";


    heart.style.left =
        Math.random() *
        100 +
        "%";


    heart.style.fontSize =
        (
            Math.random() *
            20 +
            15
        ) +
        "px";


    heart.style.animationDuration =
        (
            Math.random() *
            5 +
            6
        ) +
        "s";


    container.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 12000);

}


setInterval(
    createFloatingHeart,
    700
);


/* ========================================= */
/* RESIZE */
/* ========================================= */

window.addEventListener(
    "resize",
    () => {

        const gameScreen =
            document.getElementById(
                "game-screen"
            );


        if (
            gameScreen &&
            gameScreen.classList.contains(
                "active"
            )
        ) {

            moveHeart();

        }

    }
);