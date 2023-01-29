let screen = document.querySelector(".screen");
const codPin = document.querySelector(".codPin");
const nums = document.querySelectorAll(".btn");
const back = document.querySelector(".back");
const ok = document.querySelector(".ok");
const power = document.querySelector(".power");
const trialsLeft = document.querySelector(".trialsLeft");
const keyboard = document.querySelector(".keyboard");
const password = "1234"; // Correct Password
let tryToLock = 3; // How many you write incorrect password
let timeToUnlock = [3, 5, 10, 15, 20, 30, 60, 120, 200, 220, 300];
let indexUnlock = 0;
let display = ["•", "•", "•", "•"]; // Default Display arrow
let numOf = 0; // Position of sign in arrow;
let full = false;

// Turn OFF and Turn ON
power.onclick = () => {
  screen.classList.toggle("turnOff");
  codPin.classList.toggle("turnOff");
  nums.forEach((el) => {
    el.classList.toggle("block2");
    el.classList.toggle("turnOff");
  });
  trialsLeft.classList.toggle("block2");
  back.classList.toggle("turnOff");
  ok.classList.toggle("turnOff");
};

// Block numKeys
function blockNumKeys() {
  nums.forEach((el) => {
    el.classList.add("deactivation");
  });
  ok.classList.remove("deactivation"); // Ok button activation
  full = true; // haslo ma 4 znaki
  console.log("blockNumKeys");
}

function unblockNumKeys() {
  nums.forEach((el) => {
    el.classList.remove("deactivation");
    ok.classList.add("deactivation"); // Ok button deactivation
    full = false; // haslo ma 4 znaki
  });
  console.log("unblockNumKeys");
}

// Update screen
function updateScreen(nr) {
  if (numOf <= 3) {
    display[numOf] = nr;
    screen.innerHTML = display.join("");
    back.classList.remove("deactivation"); // Activate undo button
    console.log("Update num>", numOf);
    numOf++;
    if (numOf == 4) blockNumKeys();
  }
}

// BackFunction
function undoLast() {
  if (numOf > 0) {
    display[numOf - 1] = "•";
    screen.innerHTML = display.join("");
    unblockNumKeys();
    console.log("Undo num>", numOf);
    numOf--;
    if (numOf == 0) back.classList.add("deactivation"); // Deactivation undo button
  } else {
    back.classList.add("deactivation"); // Deactivation undo button
  }
}

function deactivationAll() {
  back.classList.add("deactivation");
  ok.classList.add("deactivation");
}
function activationAll() {
  back.classList.remove("deactivation");
  ok.classList.remove("deactivation");
}

function clearScreen() {
  screen.classList.remove("wrong");
  display = ["•", "•", "•", "•"];
  screen.innerText = display.join("");
  numOf = 0;
}

function lockPhone() {
  blockNumKeys();
  keyboard.classList.add("deactivation");
  ok.classList.add("deactivation");
  trialsLeft.innerText = "Phone has been locked";
  let i = timeToUnlock[indexUnlock];
  let intervalToUnlock = setInterval(() => {
    trialsLeft.innerText = `${i} second to unlock`;
    i--;
    if (i < 0) {
      trialsLeft.innerText = ``;
      //unlock
      ok.classList.remove("deactivation");
      keyboard.classList.remove("deactivation");
      clearScreen();
      clearInterval(intervalToUnlock);
      unblockNumKeys();
      tryToLock = 3;
      indexUnlock++;
      activationAll();
    }
  }, 1600);
}

function chceckLock() {
  console.log("trialsLeft");
  tryToLock--;
  if (tryToLock < 1) {
    lockPhone();
  } else {
    trialsLeft.innerText = tryToLock + "tries to lock";
    setTimeout(() => (trialsLeft.innerText = ""), 1600);
    setTimeout(() => {
      //Unlock after animation
      numOf = 0;
      activationAll();
      unblockNumKeys();
      clearScreen();
    }, 1600);
  }
}

function checkPassword() {
  console.log("check psw:", screen.innerText, password);
  if (screen.innerText == password) {
    // Correct Password
    indexUnlock = 0;
    console.log("Correct password");
    deactivationAll();
    screen.classList.add("correct");
    setTimeout(() => {
      screen.classList.remove("correct");
      activationAll();
    }, 1600);
  } else {
    // Incorrect Password
    console.log("Incorrect password");
    screen.classList.add("wrong");
    deactivationAll();
    chceckLock();
    // setTimeout(() => {
    //   screen.classList.remove("wrong");
    // }, 1600);
  }
}

back.classList.add("deactivation"); // Deactivation undo button
ok.classList.add("deactivation"); // Deactivation ok button

// Click on the button
nums.forEach((el) => {
  el.onclick = () => {
    // console.log(el.innerText);
    updateScreen(el.innerText);
  };
});

back.onclick = () => {
  undoLast();
};

ok.onclick = () => {
  checkPassword();
};

// press key from keyboard
window.addEventListener("keydown", (el) => {
  if (el.key >= 0 && el.key <= 9) {
    updateScreen(el.key);
  }
  if (el.key == "Backspace") {
    undoLast();
  }
  if (el.key == "Enter") {
    if (full) checkPassword();
  }
});
