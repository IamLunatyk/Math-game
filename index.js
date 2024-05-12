let displayOne = document.getElementById("displayOne");
let displayTwo = document.getElementById("displayTwo");
let wynikElement = document.getElementById("wynikElement");
let randomowyZnak = document.getElementById("randomowyZnak");
let buttonOne = document.getElementById("buttonOne");
let buttonTwo = document.getElementById("buttonTwo");
let answer = document.getElementById("answer");
let counterLeft = document.getElementById("counterLeft");
let counterRight = document.getElementById("counterRight");

let x = 0;
let numberHide = 0;
let goodAnswers = 0; // Zmieniłem wartość początkową na 1, aby uniknąć konfliktu z inkrementacją
let badAnswers = 0; // Zmieniłem wartość początkową na 1, aby uniknąć konfliktu z inkrementacją

function losowyZnak() {
  let losowaCyfra = Math.floor(Math.random() * 4) + 1;
  let znak;
  if (losowaCyfra === 4) {
    znak = "+";
  } else if (losowaCyfra === 3) {
    znak = "-";
  } else if (losowaCyfra === 2) {
    znak = "x";
  } else {
    znak = ":";
  }
  return znak;
}

function randomOne() {
  let cyfra = Math.floor(Math.random() * 10) + 1;
  let cyfra2 = Math.floor(Math.random() * 10) + 1;
  let znak = losowyZnak();

  if (znak === ":") {
    while (cyfra % cyfra2 > 0) {
      cyfra = Math.floor(Math.random() * 10) + 1;
      cyfra2 = Math.floor(Math.random() * 10) + 1;
    }
  }

  displayTwo.value = cyfra2;
  displayOne.value = cyfra;

  randomowyZnak.innerText = znak;
}

function obliczWynik() {
  const cyfra = parseInt(displayOne.value);
  const cyfra2 = parseInt(displayTwo.value);
  const zmiennyZnak = randomowyZnak.innerText;
  if (cyfra > 0 && cyfra2 > 0) {
    let score;

    if (zmiennyZnak === "+") {
      score = cyfra + cyfra2;
    } else if (zmiennyZnak === "-") {
      score = cyfra - cyfra2;
    } else if (zmiennyZnak === "x") {
      score = cyfra * cyfra2;
    } else if (zmiennyZnak === ":") {
      score = cyfra / cyfra2;
    }
    wynikElement.value = score;
  }
}

function hideDigit() {
  numberHide = Math.floor(Math.random() * 3) + 1;
  if (numberHide === 1) {
    x = parseInt(displayOne.value);
    displayOne.value = "?";
  } else if (numberHide === 2) {
    x = parseInt(displayTwo.value);
    displayTwo.value = "?";
  } else {
    x = parseInt(wynikElement.value);
    wynikElement.value = "?";
  }
}

function checkDigit() {
  let displayedValue;

  if (numberHide === 1) {
    displayedValue = parseInt(displayOne.value);
  } else if (numberHide === 2) {
    displayedValue = parseInt(displayTwo.value);
  } else {
    displayedValue = parseInt(wynikElement.value);
  }

  if (x === displayedValue) {
    answer.innerText = "Correct";
    goodAnswers++;
    console.log(goodAnswers);
    counterLeft.innerText = "👍" + goodAnswers;
  } else {
    answer.innerText = "Wrong";
    badAnswers++;
    console.log(badAnswers);
    counterRight.innerText = "👎" + badAnswers; // Poprawiłem ustawienie licznika złych odpowiedzi
  }

  setTimeout(function () {
    answer.innerText = "";
  }, 2000);
}

document.getElementById("displayOne").addEventListener("focus", function () {
  if (this.value === "?") {
    this.value = "";
  }
});

document.getElementById("displayTwo").addEventListener("focus", function () {
  if (this.value === "?") {
    this.value = "";
  }
});

document.getElementById("wynikElement").addEventListener("focus", function () {
  if (this.value === "?") {
    this.value = "";
  }
});

buttonOne.addEventListener("click", function () {
  randomOne();
  obliczWynik();
  hideDigit();
});

buttonTwo.addEventListener("click", function () {
  checkDigit();
});
