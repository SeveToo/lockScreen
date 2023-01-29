const screen = document.querySelector(".screen");
const codPin = document.querySelector(".codPin");
const nums = document.querySelectorAll(".btn");
const back = document.querySelector(".back");
const ok = document.querySelector(".ok");
const power = document.querySelector(".power");
const password = "1234";
let wrongTry = 1;
// let screenOn = ture;

// Turn on and Turn off options
power.onclick = () => {
  screen.classList.toggle("turnOff");
  codPin.classList.toggle("turnOff");
  nums.forEach((el) => {
    el.classList.toggle("turnOff");
  });
  back.classList.toggle("turnOff");
  ok.classList.toggle("turnOff");
};

let display = ["•", "•", "•", "•"];
let numOf = 0;
nums.forEach((el) => {
  el.onclick = () => {
    if (numOf < 4) {
      display[numOf] = el.textContent;
      numOf++;
      console.log(numOf);
    }
    screen.textContent = display.join("");
    if (numOf == 4) deactivationKeyNums();
  };
});

back.onclick = () => {
  for (let i = display.length - 1; i >= 0; i--) {
    if (display[i] != "•") {
      numOf--;
      display[i] = "•";
      screen.textContent = display.join("");
      break;
    }
  }
  if (numOf < 4) unlockKeyboard();

  console.log(numOf);
};

function unlockKeyboard() {
  // activation of buttons
  console.log("assad");
  nums.forEach((el) => {
    el.classList.remove("block");
  });
  back.classList.remove("deactivation");
  ok.classList.remove("deactivation");
  nums.forEach((el) => {
    el.classList.remove("deactivation");
  });
}

function lockKeyNums() {
  // activation of buttons
  nums.forEach((el) => {
    el.classList.add("block");
  });
}
function lockKeyFunc() {
  back.classList.add("deactivation");
  ok.classList.add("deactivation");
}

function deactivationKeyNums() {
  nums.forEach((el) => {
    el.classList.add("deactivation");
  });
}

// Blocking phone
function blockPhone() {
  screen.textContent = "Phone Blocked";
  // deactivation of buttons
  lockKeyNums();
  lockKeyFunc();
  screen.classList.add("block");

  let timeToEnd = 30;
  let blockedTo = setInterval(() => {
    screen.innerHTML = `<p>Bloced by</p><p> ${timeToEnd}s</p>`;
    if (timeToEnd < 1) {
      console.log("unlock");
      clearInterval(blockedTo);
      unlockKeyboard();
      display = ["•", "•", "•", "•"];
      screen.innerHTML = display.join("");
      screen.classList.remove("block");
    }
    timeToEnd--;
  }, 1000);
}

ok.onclick = () => {
  // Correct password
  numOf = 0;
  if (display.join("") == password) {
    screen.textContent = "Correct";
    nums.forEach((el) => {
      el.classList.add("block");
      screen.classList.add("block");
    });
    setTimeout(() => {
      nums.forEach((el) => {
        el.classList.remove("block");
        screen.classList.remove("block");
      });
    }, 1000);
    // Wrong Password
  } else {
    if (wrongTry > 2) {
      blockPhone();
      wrongTry = 0;
    } else {
      nums.forEach((el) => {
        el.classList.add("block");
      });
      screen.classList.add("block");
      wrongTry++;
      screen.classList.add("wrong");
      setTimeout(() => {
        display = ["•", "•", "•", "•"];
        screen.classList.remove("wrong");
        screen.classList.remove("block");
        nums.forEach((el) => {
          el.classList.remove("block");
        });
        screen.textContent = "••••";
        numOf = 0;
      }, 1000);
      screen.textContent = "Wrong";
    }
  }
};
