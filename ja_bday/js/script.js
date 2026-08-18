// config

const CONFIG = {
    correctName: "Ashley Krish Parce",

    // August 19, 2006
    correctBirthday: "2006-08-19"
};


// scene ref

const scenes = {
    loading: document.getElementById("loading-screen"),
    identity: document.getElementById("identity-screen"),
    birthday: document.getElementById("birthday-screen"),
    intro: document.getElementById("birthday-intro"),
    message: document.getElementById("message-screen"),
    memories: document.getElementById("memories-screen"),
    ending: document.getElementById("ending-screen")
};


//button & form ref

const startButton =
    document.getElementById("start-button");

const loadingStatus =
    document.querySelector(".loading-status");

const identityForm =
    document.getElementById("identity-form");

const nameInput =
    document.getElementById("name-input");

const birthdayForm =
    document.getElementById("birthday-form");

const birthdayInput =
    document.getElementById("birthday-input");

const identitySkip =
    document.getElementById("identity-skip");

const birthdaySkip =
    document.getElementById("birthday-skip");


const beginMessageButton =
    document.getElementById("begin-message-button");

const continueToMemories =
    document.getElementById("continue-to-memories");

const restartButton =
    document.getElementById("restart-button");


//dialogue ref

const identitySpeaker =
    document.getElementById("identity-speaker");

const identityDialogue =
    document.getElementById("identity-dialogue");

const catCharacter =
    document.getElementById("cat-character");

const birthdaySpeaker =
    document.getElementById("birthday-speaker");

const birthdayDialogue =
    document.getElementById("birthday-dialogue");

const birthdayError =
    document.getElementById("birthday-error");


//dialogue system

let dialogueTimer = null;


function waitForDialogue({
    duration = 5000,
    skipButton,
    onComplete
}) {


    clearTimeout(dialogueTimer);

//skip button
    skipButton.classList.remove("hidden");


    let completed = false;


    function finishDialogue() {

        if (completed) {
            return;
        }


        completed = true;


        clearTimeout(dialogueTimer);


        skipButton.classList.add("hidden");


        onComplete();

    }

    //auto progression
    dialogueTimer =
        setTimeout(() => {

            finishDialogue();

        }, duration);


//manual skip kay mahina iya pasensya kis'a

    skipButton.onclick = () => {

        finishDialogue();

    };

}


//memo ref, usually pics here

const memoryCard =
    document.getElementById("memory-card");

const memoryImage =
    document.getElementById("memory-image");

const memoryCaption =
    document.getElementById("memory-caption");

const memoryCounter =
    document.getElementById("memory-counter");

const previousMemory =
    document.getElementById("previous-memory");

const nextMemory =
    document.getElementById("next-memory");


const nameVerification =
    document.getElementById("name-verification");

const verificationProgress =
    document.getElementById("verification-progress");

const verificationPercent =
    document.getElementById("verification-percent");

const verificationStatus =
    document.getElementById("verification-status");

const birthdayVerification =
    document.getElementById("birthday-verification");

const birthdayVerificationProgress =
    document.getElementById(
        "birthday-verification-progress"
    );

const birthdayVerificationPercent =
    document.getElementById(
        "birthday-verification-percent"
    );

const birthdayVerificationStatus =
    document.getElementById(
        "birthday-verification-status"
    );


//memo data, pics na here

const memories = [
    {
        image: "assets/images/photos/ja1.png",
        caption:
            "Sorry, saved this pic. Just found it cute..."
    },

    {
        image: "assets/images/photos/ja2.png",
        caption:
            "Okay, this one was actually adorable."
    },

    {
        image: "assets/images/photos/ja3.png",
        caption:
            "No explanation needed. I just liked this one. Like... slay~"
    },

    {
        image: "assets/images/photos/ja4.png",
        caption:
            "You looked really happy here. Had to keep it!"
    },

    {
        image: "assets/images/photos/ja5.png",
        caption:
            "I did say blue... but am I imagining things? Hmmm..."
    },

    {
        image: "assets/images/photos/ja6.png",
        caption:
            "LAG-UKA, GIRL! TUROS!"
    },

    {
        image: "assets/images/photos/ja7.png",
        caption:
            "Piktyur muna bago ang sakunaHAHAHAHA."
    },

    {
        image: "assets/images/photos/ja8.png",
        caption:
            "Okay, maybe I saved more pictures than I should have."
    },

    {
        image: "assets/images/photos/ja9.png",
        caption:
            "Third leg yarn?"
    },

    {
        image: "assets/images/photos/ja10.png",
        caption:
            "HAHAHAHAHAHAHAHAHAHAHAHA"
    }
];


let currentMemory = 0;


//scene switching

function showScene(sceneName) {

    Object.values(scenes).forEach(scene => {
        scene.classList.remove("active");
    });


    const targetScene = scenes[sceneName];

    if (!targetScene) {
        console.error(
            `Scene "${sceneName}" does not exist.`
        );

        return;
    }

//delay a bit
    setTimeout(() => {

        targetScene.classList.add("active");

    }, 50);
}


//start button

startButton.addEventListener("click", () => {

    if (startButton.disabled) {
        return;
    }


    showScene("identity");


//clean screen for identity thingy

    identityForm.classList.remove("hidden");

    nameInput.focus();

});




//name normalization

function normalizeName(value) {

    return value
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

//ver loading system

function runVerification({
    overlay,
    progressBar,
    percentText,
    statusText,
    messages,
    duration,
    onComplete
}) {


    let finished = false;

    let startTime = Date.now();

//overlay
    overlay.classList.remove("hidden");


//reset progress

    progressBar.style.width = "0%";

    percentText.textContent = "0%";

    statusText.textContent =
        messages[0];


    //each message gets an equal portion of the total verification time.
        


    const messageDuration =
        duration / messages.length;


    let currentMessage = 0;


//change status message every dur or sec

    const messageTimer =
        setInterval(() => {

            currentMessage++;


            if (
                currentMessage <
                messages.length
            ) {

                statusText.textContent =
                    messages[currentMessage];

            }

        }, messageDuration);


//animate percentage

    const progressTimer =
        setInterval(() => {

            const elapsed =
                Date.now() - startTime;


            let percentage =
                Math.min(
                    (elapsed / duration) * 100,
                    100
                );


            progressBar.style.width =
                `${percentage}%`;


            percentText.textContent =
                `${Math.floor(percentage)}%`;


            if (percentage >= 100) {

                finish();

            }

        }, 50);


//finish ver

    function finish() {

        if (finished) {
            return;
        }


        finished = true;


        clearInterval(messageTimer);

        clearInterval(progressTimer);


        progressBar.style.width = "100%";

        percentText.textContent = "100%";


//100% moment before leaving

        setTimeout(() => {

            overlay.classList.add("hidden");

            onComplete();

        }, 500);

    }
}



//name ver again

identityForm.addEventListener("submit", event => {

    event.preventDefault();


    const enteredName =
        normalizeName(nameInput.value);


//input, empty

    if (!enteredName) {

        identitySpeaker.textContent =
            "🐶 Axel";

        identityDialogue.innerHTML =
            `
            "You have to type something first."
            `;

        return;
    }


//if ashley lang

    if (enteredName === "ashley") {

        identitySpeaker.textContent =
            "🐶 Axel";

        identityDialogue.innerHTML =
            `
            "That's that?"
            <br><br>
            You sure that's all you've got?
            `;

        return;
    }


//if ashley krish lang

    if (enteredName === "ashley krish") {

        identitySpeaker.textContent =
            "🐶 Axel";

        identityDialogue.innerHTML =
            `
            "Uh-huh...?"
            <br><br>
            Then?
            `;

        return;
    }


//correct name

    if (
        enteredName ===
        normalizeName(CONFIG.correctName)
    ) {

        /*
            Hide the form immediately.
        */

        identityForm.classList.add("hidden");


        /*
            Start verification.
        */

        runVerification({

            overlay: nameVerification,

            progressBar:
                verificationProgress,

            percentText:
                verificationPercent,

            statusText:
                verificationStatus,

            duration: 5000,

            messages: [
                "Checking identity...",
                "Comparing records...",
                "Making sure you're not an impostor...",
                "Running extremely serious security checks...",
                "Okay... we're pretty sure it's you."
            ],

            onComplete: () => {

//axel doggy dialogue

                identitySpeaker.textContent =
                    "🐶 Axel";

                identityDialogue.innerHTML =
                    `
                    "OH!"
                    <br><br>
                    Turns out it's you.
                    `;


                waitForDialogue({

                    duration: 5000,

                    skipButton: identitySkip,

                    onComplete: () => {


                        identitySpeaker.textContent =
                            "🐶 Axel";

                        identityDialogue.innerHTML =
                            `
                            "My bad."
                            <br><br>
                            Just wanted to keep the bad guys out.
                            `;


                        waitForDialogue({

                            duration: 5000,

                            skipButton: identitySkip,

                            onComplete: () => {

//peanut's

                                catCharacter.classList.remove(
                                    "hidden"
                                );

                                identitySpeaker.textContent =
                                    "🐱 Peanut";

                                identityDialogue.innerHTML =
                                    `
                                    "...Finally."
                                    <br><br>
                                    Took you long enough.
                                    `;


                                waitForDialogue({

                                    duration: 5000,

                                    skipButton: identitySkip,

                                    onComplete: () => {

//bday scene moving

                                        showScene(
                                            "birthday"
                                        );

                                        birthdayInput.focus();

                                    }

                                });

                            }

                        });

                    }

                });

            }

        });

        return;
    }

//else
    identitySpeaker.textContent =
        "🐶 Axel";

    identityDialogue.innerHTML =
        `
        "Nice try."
        <br><br>
        But you're not getting past me that easily.
        `;

});

//bday ver

birthdayForm.addEventListener("submit", event => {

    event.preventDefault();


    const enteredBirthday =
        birthdayInput.value;


//empty bday

    if (!enteredBirthday) {

        birthdayError.textContent =
            "You forgot to tell me your birthday.";

        return;
    }


//incorrect

    if (
        enteredBirthday !==
        CONFIG.correctBirthday
    ) {

        birthdayError.textContent =
            "You sure that's your birthday for Ashley Krish Parce?";

        birthdaySpeaker.textContent =
            "🐱 Peanut";

        birthdayDialogue.innerHTML =
            `
            "You sure?"
            <br><br>
            Because something isn't adding up.
            `;

        return;
    }


//correct

    birthdayError.textContent = "";

    birthdayForm.classList.add("hidden");

    runVerification({

        overlay:
            birthdayVerification,

        progressBar:
            birthdayVerificationProgress,

        percentText:
            birthdayVerificationPercent,

        statusText:
            birthdayVerificationStatus,

        duration: 5000,

        messages: [
            "Looking through the records...",
            "Checking the date...",
            "Asking Peanut...",
            "Peanut is thinking...",
            "Okay. It's definitely you."
        ],

        onComplete: () => {

            birthdaySpeaker.textContent =
                "🐱 Peanut";

            birthdayDialogue.innerHTML =
                `
                "...Huh."
                <br><br>
                You actually got it right.
                `;


            waitForDialogue({

                duration: 5000,

                skipButton:
                    birthdaySkip,

                onComplete: () => {

                    birthdaySpeaker.textContent =
                        "🐱 Peanut";

                    birthdayDialogue.innerHTML =
                        `
                        I suppose that means
                        you're allowed in.
                        `;


                    waitForDialogue({

                        duration: 5000,

                        skipButton:
                            birthdaySkip,

                        onComplete: () => {

                            birthdaySpeaker.textContent =
                                "🐶 Axel";

                            birthdayDialogue.innerHTML =
                                `
                                "SHE GOT IT!!"
                                <br><br>
                                I told you it was her!
                                `;


                            createConfetti();


                            waitForDialogue({

                                duration: 5000,

                                skipButton:
                                    birthdaySkip,

                                onComplete: () => {

                                    showScene("intro");

                                }

                            });

                        }

                    });

                }

            });

        }

    });

});

//bday msg

beginMessageButton.addEventListener("click", () => {

    showScene("message");

});


//msg + memo

continueToMemories.addEventListener("click", () => {

    showScene("memories");

    currentMemory = 0;

    updateMemory();

});


//memo system


function updateMemory() {

    const memory =
        memories[currentMemory];

    memoryCard.classList.remove("flipped");


//upd image

    memoryImage.src =
        memory.image;


//upd alt text

    memoryImage.alt =
        `Memory ${currentMemory + 1}`;


//upd caption

    memoryCaption.textContent =
        memory.caption;


//upd counter

    memoryCounter.textContent =
        `${String(currentMemory + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;


//prev button

previousMemory.disabled =
    currentMemory === 0;


//next/finish button

nextMemory.disabled = false;


//change whether next or finish

if (currentMemory === memories.length - 1) {

    nextMemory.textContent =
        "Finish →";

    nextMemory.classList.add(
        "finish-button"
    );

} else {

    nextMemory.textContent =
        "→";

    nextMemory.classList.remove(
        "finish-button"
    );

}


}


//flip memo card aka flashcards

memoryCard.addEventListener("click", () => {

    memoryCard.classList.toggle("flipped");

});


//allow keyboard to flip card

memoryCard.addEventListener("keydown", event => {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        memoryCard.classList.toggle("flipped");

    }

});


//next memo / finish

nextMemory.addEventListener("click", event => {

    event.stopPropagation();


//if final card, go ending

    if (currentMemory === memories.length - 1) {

        showScene("ending");

        return;
    }


//else, move next card

    currentMemory++;

    updateMemory();

});



//prev memo

previousMemory.addEventListener("click", event => {

    event.stopPropagation();


    if (currentMemory > 0) {

        currentMemory--;

        updateMemory();

    }

});


//reset

function resetExperience() {

//cancel load

    clearTimeout(loadingTimer);

    loadingSequenceId++;


//reset memo

    currentMemory = 0;

    memoryCard.classList.remove("flipped");

    nextMemory.textContent = "→";

    previousMemory.disabled = true;

    nextMemory.disabled = false;

    updateMemory();


//reset identity form

    identityForm.reset();

    identityForm.classList.remove("hidden");


//reset identity dialogue

    identitySpeaker.textContent =
        "🐶 Axel";

    identityDialogue.innerHTML =
        `
        Please stop for a moment.
        <br>
        May I ask who are you?
        `;


//hide peanut

    catCharacter.classList.add("hidden");


//reset bday form

    birthdayForm.reset();

    birthdayForm.classList.remove("hidden");


//reset bday dialouge

    birthdaySpeaker.textContent =
        "🐱 Peanut";

    birthdayDialogue.innerHTML =
        `
        One more thing.
        <br>
        When were you born?
        `;


//clear bday error

    birthdayError.textContent = "";


//hide ver overlays

    nameVerification.classList.add("hidden");

    birthdayVerification.classList.add("hidden");


//reset name ver

    verificationProgress.style.width = "0%";

    verificationPercent.textContent = "0%";

    verificationStatus.textContent =
        "Checking identity...";


//reset bday ver
    birthdayVerificationProgress.style.width = "0%";

    birthdayVerificationPercent.textContent = "0%";

    birthdayVerificationStatus.textContent =
        "Looking through the records...";


//reset dialogue timer

    clearTimeout(dialogueTimer);


//hide skip buttons

    identitySkip.classList.add("hidden");

    birthdaySkip.classList.add("hidden");


//reset ready button

    startButton.disabled = true;

    startButton.classList.remove("ready");


//reload / start loading again
    showScene("loading");

    startLoadingSequence();

}



//restart exp

restartButton.addEventListener("click", () => {

//reset

    currentMemory = 0;

    nameInput.value = "";

    birthdayInput.value = "";

    birthdayError.textContent = "";

    catCharacter.classList.add("hidden");

    nextMemory.textContent = "→";


//show identity form again

    identityForm.classList.remove("hidden");


//reset dialogue

    identitySpeaker.textContent =
        "🐶 Axel";

    identityDialogue.innerHTML =
        `
        Halt.
        <br>
        Who are you?
        `;


    birthdaySpeaker.textContent =
        "🐱 Peanut";

    birthdayDialogue.innerHTML =
        `
        One more thing.
        <br>
        When were you born?
        `;


//reset memo card

    memoryCard.classList.remove("flipped");

    updateMemory();


//restart entire loading screen

    resetLoadingScreen();

});





//forda confetti

function createConfetti() {

    const confettiSymbols = [
        "🎉",
        "🎈",
        "✨",
        "🐾",
        "🦴",
        "🧶",
        "🤍"
    ];


    const amount = 25;


    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("span");


        piece.textContent =
            confettiSymbols[
                Math.floor(
                    Math.random() *
                    confettiSymbols.length
                )
            ];


        piece.style.position = "fixed";

        piece.style.left =
            `${Math.random() * 100}vw`;

        piece.style.top =
            `${Math.random() * 30 + 20}vh`;

        piece.style.fontSize =
            `${Math.random() * 1 + 0.8}rem`;

        piece.style.zIndex = "9999";

        piece.style.pointerEvents = "none";

        piece.style.transition =
            "transform 2s ease-out, opacity 2s ease-out";


        document.body.appendChild(piece);


//forcing browser to adjust

        requestAnimationFrame(() => {

            piece.style.transform =
                `
                translate(
                    ${(Math.random() - 0.5) * 300}px,
                    ${Math.random() * 400 + 200}px
                )
                rotate(
                    ${Math.random() * 720 - 360}deg
                )
                `;

            piece.style.opacity = "0";

        });


//remove after animation

        setTimeout(() => {

            piece.remove();

        }, 2200);

    }

}

//loading system

let loadingTimer = null;
let loadingSequenceId = 0;


function startLoadingSequence() {

    clearTimeout(loadingTimer);

    loadingSequenceId++;

    const sequenceId = loadingSequenceId;


//reset load ui

    loadingStatus.textContent =
        "almost there...";

    startButton.disabled = true;

    startButton.classList.remove("ready");


//reset check marks

    const checkMarks =
        document.querySelectorAll(
            ".loading-checks span"
        );

    checkMarks.forEach(check => {

        check.style.animation = "none";

        void check.offsetWidth;

        check.style.animation = "";

    });


//finish load

    loadingTimer = setTimeout(() => {

        if (sequenceId !== loadingSequenceId) {
            return;
        }


        loadingStatus.textContent =
            "Good to go!";

        startButton.disabled = false;

        startButton.classList.add("ready");

    }, 4500);

}

//loading screen

function resetLoadingScreen() {

//visible

    showScene("loading");


//reset text

    loadingStatus.textContent =
        "almost there...";


//reset button

    startButton.disabled = true;

    startButton.classList.remove("ready");


//restart animation

    const checks =
        document.querySelectorAll(".loading-checks span");

    checks.forEach(check => {

        check.style.animation = "none";

//force browser to follow and adjust

        void check.offsetWidth;

        check.style.animation = "";

    });


 //wait until loading finishes

    setTimeout(() => {

        loadingStatus.textContent =
            "Good to go!";

        startButton.disabled = false;

        startButton.classList.add("ready");

    //delay, currently 4.5 sec
    }, 4500);

}

//initial page load

resetLoadingScreen();

//prep memory system

updateMemory();

//done

console.log(
    "🐾 Ja's birthday website initialized."
);
