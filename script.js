// ------ Constants ------

const CHARSETS = {
  letters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  numbers: "0123456789".split(""),
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=".split(""),
};

const MIN_LENGTH = 6;

// ------ Cache DOM elements ------

const lengthEl = document.getElementById("length-el");
const checkbox = {
  letters: document.getElementById("include-letters"),
  numbers: document.getElementById("include-numbers"),
  symbols: document.getElementById("include-symbols"),
};
const generateBtn = document.getElementById("generate-btn");
const passwordEls = [
  document.getElementById("password-el-one"),
  document.getElementById("password-el-two"),
];

// ------ Functions ------

function getSelectedCharsets() {
  const selectedCharsets = Object.keys(checkbox)
    .filter((key) => checkbox[key].checked)
    .map((key) => CHARSETS[key]);

  return selectedCharsets.length ? selectedCharsets : [CHARSETS.letters];
}

function generatePassword(
  passwordLength = MIN_LENGTH,
  selectedCharsets = [CHARSETS.letters] // nested array
) {
  passwordLength = Math.max(passwordLength, MIN_LENGTH);
  const flatSelectedCharset = selectedCharsets.flat();

  let password = "";

  // Ensure one character from each charset in case the same charset is generated
  selectedCharsets.forEach((charsetArr) => {
    password += charsetArr[Math.floor(Math.random() * charsetArr.length)];
  });

  // Fill remaining length randomly
  for (let i = password.length; i < passwordLength; i++) {
    password +=
      flatSelectedCharset[
        Math.floor(Math.random() * flatSelectedCharset.length)
      ];
  }

  // Fisher Yates Shuffle password randomly
  const pwdArr = password.split("");
  for (let i = pwdArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pwdArr[i], pwdArr[j]] = [pwdArr[j], pwdArr[i]];
  }

  return pwdArr.join("");
}

function renderPasswords() {
  const lengthElInt = parseInt(lengthEl.value) || MIN_LENGTH;
  const selectedCharsets = getSelectedCharsets();

  passwordEls.forEach((el) => {
    el.textContent = generatePassword(lengthElInt, selectedCharsets);
    el.style.cursor = "pointer";
    el.onclick = () => {
      navigator.clipboard.writeText(el.textContent);
      alert("Copied to clipboard!");
    };
  });
}

// ------ Event Listener ------

generateBtn.addEventListener("click", renderPasswords);
