// Funny punch lines
const punches = {
    Trump: [
        "I punch better than anyone, believe me!",
        "You’re a lightweight, sad!",
        "This punch is tremendous!"
    ],
    JDVance: [
        "Take that from Ohio!",
        "My couch punches harder!",
        "Hillbilly fist bump!"
    ],
    Zelensky: [
        "Punch like it’s Kyiv!",
        "My tractor lands this one!",
        "No surrender, just fists!"
    ],
    Putin: [
        "Shirtless punch power!",
        "You’re weak, I’m strong!",
        "Russia punches first!"
    ],
    KingCharles: [
        "Royal fist incoming!",
        "Corgis trained me for this!",
        "Bow to my punch!"
    ],
    Macron: [
        "French flair punch!",
        "Baguette-powered hit!",
        "Ooh la la, take that!"
    ]
};

// Game state
let f1Character = "";
let f2Character = "";
let lastPuncher = 1;

// HTML elements
const f1Name = document.getElementById("f1-name");
const f2Name = document.getElementById("f2-name");
const punchLine = document.getElementById("punch-line");
const punchBtn = document.getElementById("punch-btn");
const resetBtn = document.getElementById("reset-btn");
const f1Select = document.getElementById("f1-select");
const f2Select = document.getElementById("f2-select");

// Pick fighters
f1Select.addEventListener("change", () => {
    f1Character = f1Select.value;
    f1Name.textContent = f1Character || "???";
    checkReady();
});
f2Select.addEventListener("change", () => {
    f2Character = f2Select.value;
    f2Name.textContent = f2Character || "???";
    checkReady();
});

// Enable punch button
function checkReady() {
    if (f1Character && f2Character && f1Character !== f2Character) {
        punchBtn.disabled = false;
        punchLine.textContent = "Ready? Punch away!";
    } else if (f1Character === f2Character) {
        punchLine.textContent = "No mirror matches!";
    }
}

// Punch action
punchBtn.addEventListener("click", () => {
    let phrase = "";
    if (lastPuncher === 1) {
        phrase = punches[f1Character][Math.floor(Math.random() * 3)];
        punchLine.textContent = `${f1Character} says: "${phrase}"`;
        lastPuncher = 2;
    } else {
        phrase = punches[f2Character][Math.floor(Math.random() * 3)];
        punchLine.textContent = `${f2Character} says: "${phrase}"`;
        lastPuncher = 1;
    }
});

// Reset game
resetBtn.addEventListener("click", () => {
    f1Character = "";
    f2Character = "";
    f1Name.textContent = "???";
    f2Name.textContent = "???";
    punchLine.textContent = "Pick two fighters and punch!";
    punchBtn.disabled = true;
    f1Select.value = "";
    f2Select.value = "";
});
