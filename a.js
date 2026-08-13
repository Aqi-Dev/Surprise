/* =====================================================
   ❤️ BIRTHDAY SURPRISE
   10 STEP JOURNEY FOR MY WIFE
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const opening = document.getElementById("opening");
const nameScreen = document.getElementById("nameScreen");
const journey = document.getElementById("journey");
const finalScreen = document.getElementById("finalScreen");

const openGift = document.getElementById("openGift");
const nameBtn = document.getElementById("nameBtn");
const nameInput = document.getElementById("nameInput");

const nextBtn = document.getElementById("nextBtn");
const finalBtn = document.getElementById("finalBtn");

const stepLabel = document.getElementById("stepLabel");
const progressFill = document.getElementById("progressFill");

const stepPhoto = document.getElementById("stepPhoto");
const stepIcon = document.getElementById("stepIcon");
const stepTag = document.getElementById("stepTag");
const stepTitle = document.getElementById("stepTitle");
const stepText = document.getElementById("stepText");

const hearts = document.getElementById("hearts");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const musicBtn =
    document.getElementById("musicBtn");


/* =====================================================
   VARIABLES
===================================================== */

let currentStep = 0;

let wifeName = "My Love";

let musicPlaying = false;

let changingStep = false;


/* =====================================================
   PHOTOS
===================================================== */

const photos = [
    "./love/images/r1.jpg",
    "./love/images/r2.jpg",
    "./love/images/r3.jpg",
    "./love/images/r4.jpg",
    "./love/images/r5.jpg",
    "./love/images/r6.jpg"
];


/* =====================================================
   10 STEPS
===================================================== */

const steps = [

    {
        icon: "🎁",
        title: "A Little Surprise For You",

        text: `
            I made something special
            for the most special woman in my life. ❤️
            <br><br>
            It isn't expensive.
            It isn't wrapped in a box.
            <br><br>
            But I made it with
            <strong>all my heart.</strong> 💕
        `
    },


    {
        icon: "🎂",
        title: "Happy Birthday, My Love!",

        text: `
            Today isn't just another day...
            <br><br>
            It's the day the woman who means
            so much to me came into this world. ❤️
            <br><br>
            And I feel incredibly lucky
            that life brought you to me.
        `
    },


    {
        icon: "🌹",
        title: "Do You Know How Special You Are?",

        text: `
            There are so many things I love about you...
            <br><br>
            Your smile. ❤️
            Your heart. 💕
            Your kindness. 🌹
            <br><br>
            And the beautiful way you make
            ordinary moments feel special.
            <br><br>
            <strong>You are truly one of a kind.</strong>
        `
    },


    {
        icon: "🥰",
        title: "My Favorite Person",

        text: `
            Out of all the people in this world...
            <br><br>
            Somehow, I got lucky enough
            to call <strong>you my wife.</strong> 💍
            <br><br>
            And honestly?
            <br><br>
            <strong>
                I wouldn't trade that for anything.
            </strong> ❤️
        `
    },


    {
        icon: "📸",
        title: "Our Beautiful Memories",

        text: `
            Every picture has a story.
            <br><br>
            Every memory has a feeling.
            <br><br>
            And every moment with you
            is something I want to keep forever. ❤️
            <br><br>
            Some moments become memories...
            but some people become
            a part of your heart.
        `
    },


    {
        icon: "💍",
        title: "If I Had To Choose Again...",

        text: `
            If I had to choose you again...
            <br><br>
            knowing everything I know today...
            <br><br>
            <strong>I would still choose you.</strong>
            <br><br>
            Again.
            <br>
            And again.
            <br>
            And again.
            <br><br>
            <strong>Every single time. ❤️</strong>
        `
    },


    {
        icon: "✨",
        title: "My Birthday Wish For You",

        text: `
            I don't just wish you happiness.
            <br><br>
            I wish you peace when life gets difficult,
            strength when things get hard,
            and success in everything you chase.
            <br><br>
            May your smile never fade,
            and may your heart always have
            a reason to be happy. ❤️
            <br><br>
            <strong>
                You deserve all the beautiful things
                in this world.
            </strong>
        `
    },


    {
        icon: "🫶",
        title: "One Promise",

        text: `
            I can't promise that every day
            will be perfect...
            <br><br>
            But I can promise that I'll keep
            making memories with you.
            <br><br>
            I'll keep choosing you.
            <br>
            I'll keep annoying you. 😂
            <br>
            I'll keep making you smile.
            <br>
            And I'll keep loving you.
            <br><br>
            <strong>
                Through every chapter of our lives. ❤️
            </strong>
        `
    },


    {
        icon: "🎂",
        title: "Happy Birthday, Beautiful",

        text: `
            Happy Birthday to my beautiful wife. ❤️
            <br><br>
            Thank you for being you.
            <br>
            Thank you for the smiles.
            <br>
            Thank you for the memories.
            <br>
            Thank you for all the little moments
            that make life more beautiful.
            <br><br>
            I hope this new year of your life
            is more beautiful than anything
            you've imagined.
            <br><br>
            <strong>
                Keep smiling.
                Keep shining.
                Keep being you. ✨
            </strong>
        `
    },


    {
        icon: "💌",
        title: "One Last Thing...",

        text: `
            If life gave me the chance
            to start all over again...
            <br><br>
            I'd still look for you.
            <br><br>
            I'd still choose you.
            <br><br>
            I'd still fall in love with you.
            <br><br>
            <strong>
                Every single time. ❤️
            </strong>
            <br><br>
            Happy Birthday, My Love.
            <br>
            <em>Forever yours. 💍❤️</em>
        `
    }

];


/* =====================================================
   SCREEN SWITCH
===================================================== */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });


    setTimeout(() => {

        screen.classList.add("active");

    }, 50);
}


/* =====================================================
   START GIFT
===================================================== */

openGift.addEventListener("click", async () => {

    openGift.disabled = true;

    createHearts(18);

    try {

        await birthdayMusic.play();

        musicPlaying = true;

        musicBtn.textContent = "🔊";

    } catch (error) {

        musicPlaying = false;

        musicBtn.textContent = "🔇";

    }


    showScreen(nameScreen);

    setTimeout(() => {

        nameInput.focus();

    }, 700);

});


/* =====================================================
   NAME
===================================================== */

nameBtn.addEventListener("click", startJourney);


nameInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        startJourney();

    }

});


function startJourney() {

    const enteredName =
        nameInput.value.trim();


    if (enteredName.length > 0) {

        wifeName = enteredName;

    } else {

        wifeName = "My Love";

    }


    createHearts(15);

    showScreen(journey);

    currentStep = 0;

    setTimeout(() => {

        renderStep();

    }, 500);

}


/* =====================================================
   RENDER STEP
===================================================== */

function renderStep() {

    const step =
        steps[currentStep];


    changingStep = true;


    /* Progress */

    const number =
        String(currentStep + 1)
            .padStart(2, "0");


    stepLabel.textContent =
        `${number} / 10`;


    progressFill.style.width =
        `${((currentStep + 1) / 10) * 100}%`;


    /* Fade old content */

    stepPhoto.style.opacity = "0";

    stepPhoto.style.transform =
        "scale(.7) rotate(-8deg)";


    stepTitle.style.opacity = "0";
    stepText.style.opacity = "0";


    setTimeout(() => {

        /* Photo */

        const photo =
            photos[currentStep % photos.length];


        stepPhoto.src = photo;


        /* Content */

        stepIcon.textContent =
            step.icon;

        stepTag.textContent =
            `STEP ${number}`;

        stepTitle.textContent =
            step.title;

        stepText.innerHTML =
            personalize(step.text);


        /* Final step */

        if (currentStep === 9) {

            nextBtn.innerHTML =
                `Finish The Journey <span>❤️</span>`;

        } else {

            nextBtn.innerHTML =
                `Continue <span>→</span>`;

        }


        /* Show */

        stepPhoto.style.opacity = "1";

        stepPhoto.style.transform =
            "scale(1) rotate(0deg)";


        stepTitle.style.opacity = "1";
        stepText.style.opacity = "1";


        changingStep = false;


        /* Hearts */

        createHearts(
            currentStep === 9 ? 25 : 7
        );

    }, 400);

}


/* =====================================================
   PERSONALIZE
===================================================== */

function personalize(text) {

    return text.replace(
        /My Love/g,
        wifeName
    );

}


/* =====================================================
   NEXT
===================================================== */

nextBtn.addEventListener("click", () => {

    if (changingStep) return;


    if (currentStep < 9) {

        currentStep++;

        renderStep();

    } else {

        openFinalScreen();

    }

});


/* =====================================================
   FINAL SCREEN
===================================================== */

function openFinalScreen() {

    createHearts(35);

    showScreen(finalScreen);

}


/* =====================================================
   FINAL BUTTON
===================================================== */

finalBtn.addEventListener("click", () => {

    createHearts(60);


    finalBtn.disabled = true;

    finalBtn.innerHTML =
        "❤️ Opening Your Surprise...";


    setTimeout(() => {

        window.location.href =
            "./love/index.html";

    }, 1600);

});


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHearts(amount = 8) {

    const heartSymbols = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💓",
        "💞",
        "✨",
        "🌹"
    ];


    for (let i = 0; i < amount; i++) {

        const heart =
            document.createElement("div");


        heart.className =
            "floating-heart";


        heart.textContent =
            heartSymbols[
                Math.floor(
                    Math.random() *
                    heartSymbols.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";


        heart.style.animationDuration =
            (4 + Math.random() * 4) + "s";


        heart.style.animationDelay =
            (Math.random() * 1.5) + "s";


        hearts.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 9000);

    }

}


/* =====================================================
   MUSIC
===================================================== */

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        birthdayMusic.pause();

        musicPlaying = false;

        musicBtn.textContent = "🔇";

    } else {

        birthdayMusic.play()
            .then(() => {

                musicPlaying = true;

                musicBtn.textContent = "🔊";

            })
            .catch(() => {

                musicPlaying = false;

                musicBtn.textContent = "🔇";

            });

    }

});


/* =====================================================
   RANDOM HEARTS
===================================================== */

setInterval(() => {

    if (
        journey.classList.contains("active") ||
        finalScreen.classList.contains("active")
    ) {

        createHearts(2);

    }

}, 5000);


/* =====================================================
   PRELOAD PHOTOS
===================================================== */

photos.forEach(src => {

    const img =
        new Image();

    img.src = src;

});


/* =====================================================
   INITIAL STATE
===================================================== */

progressFill.style.width = "10%";

console.log(
    "❤️ Birthday Surprise Ready!"
);