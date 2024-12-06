const characterLengthRange = document.getElementById("character-length")
const characterLengthDisplay = document.getElementById("character-length-text")

characterLengthRange.addEventListener("input", function(data) {
    characterLengthDisplay.innerHTML = characterLengthRange.value

    characterLengthRange.style.backgroundSize = ((characterLengthRange.value - characterLengthRange.min) / (characterLengthRange.max - characterLengthRange.min)) * 100 + "% 100%";
});

const generatedPasswordField = document.getElementById("generated-password")

const generateButton = document.getElementById("generate-button")

const includeUppercaseLetters = document.getElementById("include-uppercase-letters")
const includeLowercaseLetters = document.getElementById("include-lowercase-letters")
const includeNumbers = document.getElementById("include-numbers")
const includeSymbols = document.getElementById("include-symbols")

const passwordStrengthIndicatorText = document.getElementById("password-strength-actual")

const passwordStrengthProgressIndicator = document.getElementById("progress-indicator")

generateButton.addEventListener("click", function(data) {

   let passwordOptions = ""

   let passwordCharacters = {
    uppercaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercaseLetters: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()",
   }

   let passwordScore = 0;

   if (includeUppercaseLetters.checked) {
    passwordOptions = passwordOptions + passwordCharacters.uppercaseLetters;

    passwordScore = passwordScore + 5;
   };

   if (includeLowercaseLetters.checked) {
    passwordOptions = passwordOptions + passwordCharacters.lowercaseLetters;

    passwordScore = passwordScore + 5;
   };

   if (includeNumbers.checked) {
    passwordOptions = passwordOptions + passwordCharacters.numbers;

    passwordScore = passwordScore + 10;
   };

   if (includeSymbols.checked) {
    passwordOptions = passwordOptions + passwordCharacters.symbols;

    passwordScore = passwordScore + 10;
   };

   passwordScore = passwordScore * Number(characterLengthRange.value);
   

   let password = "";

   for (let i = 0; i <= characterLengthRange.value; i++) {
    var randomNumber = Math.floor(Math.random() * passwordOptions.length);
    password += passwordOptions.substring(randomNumber, randomNumber + 1)
   };

   generatedPasswordField.innerHTML = password;

   passwordStrengthProgressIndicator.className = "progress-indicator";
   passwordStrengthIndicatorText.classList.add("hidden-text");

   if (password.length > 0) {
    passwordStrengthIndicatorText.classList.remove("hidden-text");

    generatedPasswordField.classList.remove("faded-password");
 
    if (passwordScore > 300) {
     passwordStrengthIndicatorText.innerHTML = "STRONG"
     passwordStrengthProgressIndicator.classList.add("password-strong")
    } else if (passwordScore > 200) {
     passwordStrengthIndicatorText.innerHTML = "MEDIUM"
     passwordStrengthProgressIndicator.classList.add("password-medium")
    } else if (passwordScore > 100) {
     passwordStrengthIndicatorText.innerHTML = "WEAK"
     passwordStrengthProgressIndicator.classList.add("password-weak")
    } else {
     passwordStrengthIndicatorText.innerHTML = "TOO WEAK!"
     passwordStrengthProgressIndicator.classList.add("password-too-weak")
    }
   } else {
    generatedPasswordField.classList.add("faded-password");
    generatedPasswordField.innerText = "P4$5W0rD!";
   };

   

});

const copyButton = document.getElementById("copy-icon")

const copiedText = document.getElementById("copied-text")

copyButton.addEventListener("click", function(data) {
    if (generatedPasswordField.innerText.length > 0) {
        navigator.clipboard.writeText(generatedPasswordField.innerText);

        copiedText.classList.remove("hidden-text");

        setTimeout(function() {
            copiedText.classList.add("hidden-text");
        }, 2000);

    }
});