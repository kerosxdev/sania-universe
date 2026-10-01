/* =========================================
   SANIA — HER LITTLE UNIVERSE
   CLEAN MASTER JAVASCRIPT
   PHASES 1 → 6
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const arrival =
    document.getElementById("arrival");

const starsContainer =
    document.getElementById("stars");

const aura =
    document.getElementById("aura");

const auraText =
    document.getElementById("auraText");

const auraMessage =
    document.getElementById("auraMessage");

const auraOrb =
    document.getElementById("auraOrb");

const auraMute =
    document.getElementById("auraMute");

const enterButton =
    document.getElementById("enterUniverse");

const universe =
    document.getElementById("universe");

const cosmicBack =
    document.querySelector(".cosmic-back");

const cosmicMid =
    document.querySelector(".cosmic-mid");


/* =========================================
   AURA STATE
========================================= */

let auraMuted = false;
let auraMessageTimer = null;
let auraMessageIndex = 0;
let auraTypingTimer = null;


/* =========================================
   AURA MESSAGE DATABASE
========================================= */

const auraMessages = {

    welcome: [
        "Hey Sania... how was your day? ✨",
        "I was waiting for you.",
        "Your little universe is ready. 🌌",
        "Welcome to her little universe. ✨"
    ],

    memories: [
        "These stars hold moments worth remembering.",
        "Some memories deserve their own galaxy.",
        "Take a closer look. Every moment has a story.",
        "A little piece of the past is waiting here."
    ],

    letter: [
        "There are some words waiting for Sania.",
        "This one was written especially for her.",
        "Sometimes the quietest words mean the most.",
        "A little letter is waiting among the stars."
    ],

    things: [
        "The smallest things can become the biggest memories.",
        "Look closely. The details are where the magic lives.",
        "Every little thing tells a tiny story.",
        "Not everything beautiful needs to be big."
    ],

    random: [
        "The universe feels a little brighter tonight. ✨",
        "Somewhere between the stars, another memory is waiting.",
        "Keep exploring.",
        "You found another little corner of her universe.",
        "Maybe the best things are the ones we don't expect."
    ]

};


/* =========================================
   STAR FIELD
========================================= */

function createStars() {

    if (!starsContainer) {
        return;
    }

    const numberOfStars = 220;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add("star");

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 2 + 0.5;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.setProperty(
            "--duration",
            `${Math.random() * 5 + 2}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        starsContainer.appendChild(star);
    }
}  
  createStars();


/* =========================================
   AURA TYPEWRITER
========================================= */

function typeAuraMessage(message) {

    clearInterval(auraTypingTimer);

    auraText.textContent = "";

    aura.classList.add("speaking");

    let characterIndex = 0;

    const typingSpeed = 30;

    auraTypingTimer =
        setInterval(() => {

            auraText.textContent +=
                message.charAt(characterIndex);

            characterIndex++;

            if (
                characterIndex >=
                message.length
            ) {

                clearInterval(
                    auraTypingTimer
                );

                auraTypingTimer = null;

                setTimeout(() => {

                    if (
                        !window.speechSynthesis ||
                        window.speechSynthesis.speaking
                    ) {
                        return;
                    }

                    aura.classList.remove(
                        "speaking"
                    );

                }, 500);

            }

        }, typingSpeed);
}


/* =========================================
   AURA VOICE
========================================= */

function auraSpeak(message) {

    if (
        auraMuted ||
        !("speechSynthesis" in window)
    ) {
        return;
    }

    window.speechSynthesis.cancel();

    const utterance =
        new SpeechSynthesisUtterance(
            message
        );

    utterance.rate = 0.92;

    utterance.pitch = 1.05;

    utterance.volume = 0.7;

    aura.classList.add(
        "speaking"
    );

    utterance.onend = () => {

        aura.classList.remove(
            "speaking"
        );

    };

    utterance.onerror = () => {

        aura.classList.remove(
            "speaking"
        );

    };

    window.speechSynthesis.speak(
        utterance
    );
}


/* =========================================
   SHOW AURA MESSAGE
========================================= */

function auraShow(
    message,
    speak = true,
    duration = 6000
) {

    if (
        !aura ||
        !auraText ||
        !auraMessage
    ) {
        return;
    }

    clearTimeout(
        auraMessageTimer
    );

    clearInterval(
        auraTypingTimer
    );

    auraText.textContent =
        message;

    auraMessage.classList.add(
        "visible"
    );

    if (speak) {
        auraSpeak(message);
    }

    auraMessageTimer =
        setTimeout(() => {

            auraMessage.classList.remove(
                "visible"
            );

        }, duration);
}


/* =========================================
   RANDOM AURA MESSAGE
========================================= */

function auraRandomMessage() {

    const messages =
        auraMessages.random;

    if (
        !messages ||
        messages.length === 0
    ) {
        return;
    }

    const message =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];

    auraShow(
        message,
        true
    );
}


/* =========================================
   AURA ORB
========================================= */

if (auraOrb) {

    auraOrb.addEventListener(
        "click",
        () => {

            auraRandomMessage();

        }
    );

}


/* =========================================
   AURA MUTE
========================================= */

if (auraMute) {

    auraMute.addEventListener(
        "click",
        () => {

            auraMuted =
                !auraMuted;

            if (auraMuted) {

                if (
                    "speechSynthesis"
                    in window
                ) {

                    window.speechSynthesis.cancel();

                }

                auraMute.textContent =
                    "🔇";

                auraMute.setAttribute(
                    "aria-label",
                    "Unmute AURA"
                );

                aura.classList.remove(
                    "speaking"
                );

            } else {

                auraMute.textContent =
                    "🔊";

                auraMute.setAttribute(
                    "aria-label",
                    "Mute AURA"
                );

            }

        }
    );

}


/* =========================================
   AURA INTRO
========================================= */

setTimeout(() => {

    if (auraMessage) {

        auraMessage.classList.add(
            "visible"
        );

    }

}, 1200);


setTimeout(() => {

    const message =
        auraMessages.welcome[
            auraMessageIndex
        ];

    typeAuraMessage(message);

}, 2500);


/* =========================================
   CURSOR PARALLAX
   DESKTOP ONLY
========================================= */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth;

            const y =
                event.clientY /
                window.innerHeight;


            if (arrival) {

                arrival.style.setProperty(
                    "--mouse-x",
                    `${event.clientX}px`
                );

                arrival.style.setProperty(
                    "--mouse-y",
                    `${event.clientY}px`
                );

            }


            if (cosmicBack) {

                cosmicBack.style.transform =
                    `translate(
                        ${(x - 0.5) * -18}px,
                        ${(y - 0.5) * -18}px
                    )`;

            }


            if (cosmicMid) {

                cosmicMid.style.transform =
                    `translate(
                        ${(x - 0.5) * 28}px,
                        ${(y - 0.5) * 28}px
                    )`;

            }


            if (starsContainer) {

                starsContainer.style.transform =
                    `translate(
                        ${(x - 0.5) * 8}px,
                        ${(y - 0.5) * 8}px
                    )`;

            }


            /*
                IMPORTANT:
                Don't move AURA aggressively.
                It is a fixed viewport element.
            */

        }
    );

}


/* =========================================
   ENTER UNIVERSE
========================================= */

if (enterButton) {

    enterButton.addEventListener(
        "click",
        () => {

            enterButton.disabled = true;


            auraMessageIndex++;

            if (
                auraMessageIndex >=
                auraMessages.welcome.length
            ) {

                auraMessageIndex = 0;

            }


            const message =
                auraMessages.welcome[
                    auraMessageIndex
                ];


            /*
                Typewriter only.
                Voice is handled separately.
            */

            typeAuraMessage(
                message
            );

            auraSpeak(
                message
            );


            arrival.classList.add(
                "leaving"
            );


            setTimeout(() => {

                universe.classList.add(
                    "visible"
                );

                universe.scrollIntoView({
                    behavior: "smooth"
                });

            }, 600);


            setTimeout(() => {

    arrival.style.display = "none";
    arrival.style.pointerEvents = "none";

}, 1500);

        }
    );

}


/* =========================================
   PHASE 2
   UNIVERSE STAR FIELD
========================================= */

const universeStars =
    document.getElementById(
        "universeStars"
    );


function createUniverseStars() {

    if (!universeStars) {
        return;
    }

    const numberOfStars = 140;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add(
            "universe-star"
        );

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 2 + 0.5;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.setProperty(
            "--duration",
            `${Math.random() * 5 + 3}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        universeStars.appendChild(
            star
        );

    }

}


/* =========================================
   WORLD DATA
========================================= */

const worldData = {

    memories: {
        icon: "📸",
        label: "A GALAXY OF MEMORIES",
        title: "Our Memories",
        text:
            "A collection of moments that deserve their own little corner of the universe."
    },

    letter: {
        icon: "💌",
        label: "WORDS FROM THE HEART",
        title: "A Letter",
        text:
            "Some things are better written down, so they can stay here forever."
    },

    things: {
        icon: "🌷",
        label: "THE LITTLE DETAILS",
        title: "Little Things",
        text:
            "The tiny details, moments and things that make Sania uniquely Sania."
    },

    secret: {
        icon: "✦",
        label: "UNKNOWN STAR",
        title: "Something Hidden",
        text:
            "Not every star reveals its secret immediately. Keep exploring."
    }

};


/* =========================================
   WORLD PREVIEW
========================================= */

const worlds =
    document.querySelectorAll(
        ".world"
    );

const worldPreview =
    document.getElementById(
        "worldPreview"
    );

const previewClose =
    document.getElementById(
        "previewClose"
    );

const previewIcon =
    document.getElementById(
        "previewIcon"
    );

const previewLabel =
    document.getElementById(
        "previewLabel"
    );

const previewTitle =
    document.getElementById(
        "previewTitle"
    );

const previewText =
    document.getElementById(
        "previewText"
    );

const previewButton =
    document.getElementById(
        "previewButton"
    );


function openWorld(worldName) {

    const data =
        worldData[worldName];

    if (!data) {
        return;
    }

    previewIcon.textContent =
        data.icon;

    previewLabel.textContent =
        data.label;

    previewTitle.textContent =
        data.title;

    previewText.textContent =
        data.text;

    worldPreview.classList.add(
        "active"
    );

    worldPreview.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeWorld() {

    worldPreview.classList.remove(
        "active"
    );

    worldPreview.setAttribute(
        "aria-hidden",
        "true"
    );

}


worlds.forEach(
    (world) => {

        world.addEventListener(
            "click",
            () => {

                const worldName =
                    world.dataset.world;

                openWorld(
                    worldName
                );

            }
        );

    }
);


if (previewClose) {

    previewClose.addEventListener(
        "click",
        closeWorld
    );

}


if (worldPreview) {

    worldPreview.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                worldPreview
            ) {

                closeWorld();

            }

        }
    );

}


/* =========================================
   PREVIEW → REAL WORLD
========================================= */

if (previewButton) {

    previewButton.addEventListener(
        "click",
        () => {

            const title =
                previewTitle
                    ? previewTitle.textContent.trim()
                    : "";

            let targetId = null;

            if (
                title === "Our Memories"
            ) {

                targetId =
                    "memoryGalaxy";

            }

            else if (
                title === "A Letter"
            ) {

                targetId =
                    "letterWorld";

            }

            else if (
                title === "Little Things"
            ) {

                targetId =
                    "littleThings";

            }

            else {

                closeWorld();

                return;

            }


            closeWorld();


            const target =
                document.getElementById(
                    targetId
                );


            if (target) {

                setTimeout(() => {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 250);

            }

        }
    );

}


/* =========================================
   ESCAPE — WORLD PREVIEW
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeWorld();

        }

    }
);


createUniverseStars();


/* =========================================
   PHASE 3
   MEMORY GALAXY
========================================= */

const memoryBackgroundStars =
    document.getElementById(
        "memoryBackgroundStars"
    );

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );

const memoryViewer =
    document.getElementById(
        "memoryViewer"
    );

const memoryViewerClose =
    document.getElementById(
        "memoryViewerClose"
    );

const memoryViewerImage =
    document.getElementById(
        "memoryViewerImage"
    );

const memoryViewerNumber =
    document.getElementById(
        "memoryViewerNumber"
    );

const memoryViewerTitle =
    document.getElementById(
        "memoryViewerTitle"
    );

const memoryViewerDate =
    document.getElementById(
        "memoryViewerDate"
    );

const memoryViewerCaption =
    document.getElementById(
        "memoryViewerCaption"
    );

const memoryCounter =
    document.getElementById(
        "memoryCounter"
    );

const memoryPrev =
    document.getElementById(
        "memoryPrev"
    );

const memoryNext =
    document.getElementById(
        "memoryNext"
    );


const memories = [

    {
        image:
            "assets/photos/memory-01.jpeg",
        title: "The Beginning",
        date: "A day worth remembering",
        caption:
            "Every beautiful story has a first moment."
    },

    {
        image:
            "assets/photos/memory-02.jpeg",
        title: "A Beautiful Day",
        date: "One of those little moments",
        caption:
            "Sometimes the simplest moments become the ones we remember most."
    },

    {
        image:
            "assets/photos/memory-03.jpeg",
        title: "Just Us",
        date: "A little piece of forever",
        caption:
            "A moment doesn't have to be grand to become unforgettable."
    },

    {
        image:
            "assets/photos/memory-04.jpeg",
        title: "A Little Forever",
        date:
            "Somewhere between yesterday and tomorrow",
        caption:
            "Some memories quietly become part of who we are."
    }

];


let currentMemory = 0;


function createMemoryStars() {

    if (!memoryBackgroundStars) {
        return;
    }

    const numberOfStars = 180;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add(
            "memory-background-star"
        );

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 2 + 0.5;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.setProperty(
            "--duration",
            `${Math.random() * 5 + 3}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        memoryBackgroundStars.appendChild(
            star
        );

    }

}


function updateMemoryViewer() {

    if (
        !memories[currentMemory] ||
        !memoryViewerImage
    ) {
        return;
    }

    const memory =
        memories[currentMemory];

    memoryViewerImage.src =
        memory.image;

    memoryViewerImage.alt =
        memory.title;

    memoryViewerNumber.textContent =
        `MEMORY ${String(
            currentMemory + 1
        ).padStart(2, "0")}`;

    memoryViewerTitle.textContent =
        memory.title;

    memoryViewerDate.textContent =
        memory.date;

    memoryViewerCaption.textContent =
        memory.caption;

    memoryCounter.textContent =
        `${String(
            currentMemory + 1
        ).padStart(2, "0")} / ${String(
            memories.length
        ).padStart(2, "0")}`;

}


function openMemory(index) {

    if (
        !memories[index] ||
        !memoryViewer
    ) {
        return;
    }

    currentMemory = index;

    updateMemoryViewer();

    memoryViewer.classList.add(
        "active"
    );

    memoryViewer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function closeMemoryViewer() {

    if (!memoryViewer) {
        return;
    }

    memoryViewer.classList.remove(
        "active"
    );

    memoryViewer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


function showNextMemory() {

    currentMemory =
        (
            currentMemory + 1
        ) % memories.length;

    updateMemoryViewer();

}


function showPreviousMemory() {

    currentMemory =
        (
            currentMemory -
            1 +
            memories.length
        ) % memories.length;

    updateMemoryViewer();

}


memoryCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        card.dataset.memory
                    );

                openMemory(index);

            }
        );

    }
);


if (memoryViewerClose) {

    memoryViewerClose.addEventListener(
        "click",
        closeMemoryViewer
    );

}


if (memoryNext) {

    memoryNext.addEventListener(
        "click",
        showNextMemory
    );

}


if (memoryPrev) {

    memoryPrev.addEventListener(
        "click",
        showPreviousMemory
    );

}


if (memoryViewer) {

    memoryViewer.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                memoryViewer
            ) {

                closeMemoryViewer();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            !memoryViewer ||
            !memoryViewer.classList.contains(
                "active"
            )
        ) {
            return;
        }

        if (
            event.key === "Escape"
        ) {

            closeMemoryViewer();

        }

        if (
            event.key === "ArrowRight"
        ) {

            showNextMemory();

        }

        if (
            event.key === "ArrowLeft"
        ) {

            showPreviousMemory();

        }

    }
);


let touchStartX = 0;

let touchEndX = 0;


if (memoryViewer) {

    memoryViewer.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    memoryViewer.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            const difference =
                touchEndX -
                touchStartX;

            if (
                Math.abs(difference) < 50
            ) {
                return;
            }

            if (
                difference < 0
            ) {

                showNextMemory();

            } else {

                showPreviousMemory();

            }

        },
        {
            passive: true
        }
    );

}


createMemoryStars();


/* =========================================
   PHASE 4
   LETTER WORLD
========================================= */

const letterStars =
    document.getElementById(
        "letterStars"
    );

const letterEnvelope =
    document.getElementById(
        "letterEnvelope"
    );

const letterPaper =
    document.getElementById(
        "letterPaper"
    );

const letterClose =
    document.getElementById(
        "letterClose"
    );

const letterBack =
    document.getElementById(
        "letterBack"
    );


function createLetterStars() {

    if (!letterStars) {
        return;
    }

    const numberOfStars = 150;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add(
            "letter-star"
        );

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 2 + 0.5;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.setProperty(
            "--duration",
            `${Math.random() * 5 + 3}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        letterStars.appendChild(
            star
        );

    }

}


function openLetter() {

    if (
        !letterEnvelope ||
        !letterPaper
    ) {
        return;
    }

    letterEnvelope.classList.add(
        "open"
    );

    setTimeout(() => {

        letterPaper.classList.add(
            "active"
        );

        letterPaper.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }, 650);

}


function closeLetter() {

    if (
        !letterEnvelope ||
        !letterPaper
    ) {
        return;
    }

    letterPaper.classList.remove(
        "active"
    );

    letterPaper.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

    setTimeout(() => {

        letterEnvelope.classList.remove(
            "open"
        );

    }, 450);

}


if (letterEnvelope) {

    letterEnvelope.addEventListener(
        "click",
        openLetter
    );

}


if (letterClose) {

    letterClose.addEventListener(
        "click",
        closeLetter
    );

}


if (letterPaper) {

    letterPaper.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                letterPaper
            ) {

                closeLetter();

            }

        }
    );

}


if (letterBack) {

    letterBack.addEventListener(
        "click",
        () => {

            if (universe) {

                universe.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            letterPaper &&
            letterPaper.classList.contains(
                "active"
            )
        ) {

            closeLetter();

        }

    }
);


createLetterStars();


/* =========================================
   PHASE 5
   LITTLE THINGS
========================================= */

const thingsStars =
    document.getElementById(
        "thingsStars"
    );

const thingNodes =
    document.querySelectorAll(
        ".thing-node"
    );

const thingDetail =
    document.getElementById(
        "thingDetail"
    );

const thingDetailClose =
    document.getElementById(
        "thingDetailClose"
    );

const thingDetailIcon =
    document.getElementById(
        "thingDetailIcon"
    );

const thingDetailLabel =
    document.getElementById(
        "thingDetailLabel"
    );

const thingDetailTitle =
    document.getElementById(
        "thingDetailTitle"
    );

const thingDetailText =
    document.getElementById(
        "thingDetailText"
    );

const thingsBack =
    document.getElementById(
        "thingsBack"
    );


const littleThingsData = [

    {
        icon: "🌷",
        label: "A LITTLE JOY",
        title: "Little Joys",
        text:
            "The tiny things that can turn an ordinary moment into something worth smiling about."
    },

    {
        icon: "🌙",
        label: "QUIET HOURS",
        title: "Late Nights",
        text:
            "Those quiet hours when everything slows down and thoughts seem to wander a little farther."
    },

    {
        icon: "🎵",
        label: "SOUNDS",
        title: "Favorite Sounds",
        text:
            "The songs, voices and little sounds that somehow become attached to certain memories."
    },

    {
        icon: "☕",
        label: "COMFORT",
        title: "Comfort",
        text:
            "The familiar things that make a difficult day feel just a little softer."
    },

    {
        icon: "✨",
        label: "UNEXPECTED",
        title: "Random Magic",
        text:
            "Unexpected laughs, strange coincidences and tiny moments that nobody planned."
    },

    {
        icon: "🦋",
        label: "SOFT MOMENTS",
        title: "Soft Moments",
        text:
            "The peaceful little moments that don't ask for attention but somehow stay with us."
    }

];


function createThingsStars() {

    if (!thingsStars) {
        return;
    }

    const numberOfStars = 160;

    for (
        let i = 0;
        i < numberOfStars;
        i++
    ) {

        const star =
            document.createElement("span");

        star.classList.add(
            "things-star"
        );

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 2 + 0.5;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.setProperty(
            "--duration",
            `${Math.random() * 5 + 3}s`
        );

        star.style.animationDelay =
            `${Math.random() * 5}s`;

        thingsStars.appendChild(
            star
        );

    }

}


function openThing(index) {

    const data =
        littleThingsData[index];

    if (
        !data ||
        !thingDetail
    ) {
        return;
    }

    thingDetailIcon.textContent =
        data.icon;

    thingDetailLabel.textContent =
        data.label;

    thingDetailTitle.textContent =
        data.title;

    thingDetailText.textContent =
        data.text;

    thingDetail.classList.add(
        "active"
    );

    thingDetail.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function closeThing() {

    if (!thingDetail) {
        return;
    }

    thingDetail.classList.remove(
        "active"
    );

    thingDetail.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


thingNodes.forEach(
    (node) => {

        node.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        node.dataset.thing
                    );

                openThing(index);

            }
        );

    }
);


if (thingDetailClose) {

    thingDetailClose.addEventListener(
        "click",
        closeThing
    );

}


if (thingDetail) {

    thingDetail.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                thingDetail
            ) {

                closeThing();

            }

        }
    );

}


if (thingsBack) {

    thingsBack.addEventListener(
        "click",
        () => {

            if (universe) {

                universe.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            thingDetail &&
            thingDetail.classList.contains(
                "active"
            )
        ) {

            closeThing();

        }

    }
);


createThingsStars();


/* =========================================
   PHASE 6
   AURA WORLD REACTIONS
========================================= */

function setupAuraWorldReactions() {

    worlds.forEach(
        (world) => {

            world.addEventListener(
                "click",
                () => {

                    const worldName =
                        world.dataset.world;

                    let category =
                        "welcome";

                    if (
                        worldName ===
                        "memories"
                    ) {

                        category =
                            "memories";

                    }

                    else if (
                        worldName ===
                        "letter"
                    ) {

                        category =
                            "letter";

                    }

                    else if (
                        worldName ===
                        "things"
                    ) {

                        category =
                            "things";

                    }


                    const messages =
                        auraMessages[
                            category
                        ];

                    if (
                        !messages ||
                        !messages.length
                    ) {
                        return;
                    }

                    const message =
                        messages[
                            Math.floor(
                                Math.random() *
                                messages.length
                            )
                        ];


                    setTimeout(
                        () => {

                            auraShow(
                                message,
                                true
                            );

                        },
                        500
                    );

                }
            );

        }
    );

}


setupAuraWorldReactions();


/* =========================================
   AURA SECTION OBSERVER
========================================= */

const auraSections = [

    {
        id: "memoryGalaxy",
        message:
            "Welcome to the memory galaxy. Some moments deserve to stay among the stars."
    },

    {
        id: "letterWorld",
        message:
            "Here is the quiet corner where a few words were left behind."
    },

    {
        id: "littleThings",
        message:
            "Look closely. The smallest details can tell the biggest stories."
    }

];


if (
    "IntersectionObserver" in window
) {

    const auraObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const section =
                            auraSections.find(
                                item =>
                                    item.id ===
                                    entry.target.id
                            );

                        if (!section) {
                            return;
                        }

                        auraShow(
                            section.message,
                            true,
                            6500
                        );

                    }
                );

            },
            {
                threshold: 0.45
            }
        );


    auraSections.forEach(
        (section) => {

            const element =
                document.getElementById(
                    section.id
                );

            if (element) {

                auraObserver.observe(
                    element
                );

            }

        }
    );

}


/* =========================================
   AMBIENT AURA
========================================= */

setInterval(
    () => {

        if (
            document.hidden ||
            auraMuted
        ) {
            return;
        }

        auraRandomMessage();

    },
    45000
);  
 
/* =========================================
   PHASE 7 — SECRET STAR
   STEP 1
========================================= */

const secretStar =
    document.getElementById("secretStar");


if (secretStar) {

    secretStar.addEventListener(
        "click",
        () => {

            console.log(
                "✦ Secret Star discovered!"
            );

        }
    );

} 
  
 ////////////////////////////////////////////////////////////
// PHASE 7 — SECRET WORLD CONNECTION
////////////////////////////////////////////////////////////

const secretWorld = document.getElementById("secretWorld");
const secretBack = document.getElementById("secretBack");
const secretReveal = document.getElementById("secretReveal");

const secretPlanet = document.querySelector(".world-secret");


// Open Secret World
if (secretPlanet && secretWorld) {

    secretPlanet.addEventListener("click", () => {

        secretWorld.classList.add("is-active");
        secretWorld.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    });

}


// Return to Universe
if (secretBack && secretWorld) {

    secretBack.addEventListener("click", () => {

        secretWorld.classList.remove("is-active");
        secretWorld.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    });

}  

////////////////////////////////////////////////////////////
// PHASE 7 — SECRET REVEAL
////////////////////////////////////////////////////////////

if (secretReveal && secretWorld) {

    secretReveal.addEventListener("click", () => {

        secretWorld.classList.add("is-revealed");

        secretReveal.disabled = true;

        secretReveal.setAttribute(
            "aria-hidden",
            "true"
        );

    });

}  
 ////////////////////////////////////////////////////////////
// MUSIC PLAYER
////////////////////////////////////////////////////////////

const musicToggle = document.getElementById("musicToggle");

const backgroundMusic = new Audio(
    "music/sania-theme.mp3"
);

backgroundMusic.loop = true;
backgroundMusic.volume = 0.45;

if (musicToggle) {

    musicToggle.addEventListener("click", async () => {

        if (backgroundMusic.paused) {

            try {

                await backgroundMusic.play();

                musicToggle.classList.add(
                    "is-playing"
                );

                musicToggle.querySelector(
                    ".music-label"
                ).textContent = "Pause";

                musicToggle.setAttribute(
                    "aria-label",
                    "Pause music"
                );

            } catch (error) {

                console.error(
                    "Music could not be played:",
                    error
                );

            }

        } else {

            backgroundMusic.pause();

            musicToggle.classList.remove(
                "is-playing"
            );

            musicToggle.querySelector(
                ".music-label"
            ).textContent = "Play";

            musicToggle.setAttribute(
                "aria-label",
                "Play music"
            );

        }

    });

}