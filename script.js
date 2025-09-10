// ====== Config & Constants ======

const CHARSETS = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
  numbers: "0123456789".split(""),
  symbols: "~`!@#$%^&*()_-+=[]{},|:;<>.?/".split("")
}

const MIN_PASSWORD_LENGTH = 6;

// ====== DOM References ======

const passwordLengthInput = document.getElementById("userpwd-length");
const checkbox = {
  letters: document.getElementById("include-letters"), 
  numbers: document.getElementById("include-numbers"),
  symbols: document.getElementById("include-symbols")
};
const generateBtn = document.getElementById("generate-btn");
const passwordEls = [
  document.getElementById("password-one"),
  document.getElementById("password-two")
]

// ====== Functions ======

function getCharacterPool() {
  let pool = [];
  for (let key in checkbox) {
    if (checkbox[key].checked) pool.push(...CHARSETS[key]); 
  }
  if (pool.length === 0) pool.push(...CHARSETS.letters); // fallback
  return pool; 
}

function generatePassword() {
  let password = "";
  let length = parseInt(passwordLengthInput.value) || MIN_PASSWORD_LENGTH;
  if (length < MIN_PASSWORD_LENGTH) length = MIN_PASSWORD_LENGTH;

  const pool = getCharacterPool();
  for (let i = 0; i < length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }

  return password;
}

function copyToClipboard(pwdText) {
  navigator.clipboard.writeText(pwdText)
    .then(() => alert("Copied to clipboard!"))
    .catch(err => console.error("Failed to copy:", err));
}

// ====== Event Listeners ======

generateBtn.addEventListener("click", () => {
  passwordEls.forEach(el => el.textContent = generatePassword());
});

passwordEls.forEach(el => {
  el.addEventListener("click", () => copyToClipboard(el.textContent));
});