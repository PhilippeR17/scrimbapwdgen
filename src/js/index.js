const uppercase = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const lowercase = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];

const numbers = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

const symbols = [
    "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-",
    "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"
];

const withUppercase = document.getElementById("uppercase");
const withNumbers = document.getElementById("numbers");
const withSymbols = document.getElementById("symbols");
const pwdLength = document.getElementById("pwd-length");
const pwd1 = document.getElementById("pwd1");
const pwd2 = document.getElementById("pwd2");
const errorEl = document.getElementById("error-message");
const fieldsetEl = document.getElementById("pwd-options");

document.getElementById("toggle-theme").addEventListener("click", () => {
    const documentEl = document.documentElement;
    const theme = documentEl.getAttribute("data-theme");
    if (theme === "dark") {
        documentEl.setAttribute("data-theme", "light");
    } else {
        documentEl.setAttribute("data-theme", "dark");
    }
});

function checkPwdOptions() {
    return !(pwdLength.value < 16 ||
        !withUppercase.checked ||
        !withNumbers.checked ||
        !withSymbols.checked);
}

document.querySelectorAll(".charset, #pwd-length")
    .forEach(elt => {
        elt.addEventListener("change", () => {
            const aok = checkPwdOptions();
            document.querySelectorAll(".pwd").forEach(elt => {
                elt.textContent = "";
            })
            document.querySelectorAll(".copy, .copy-result").forEach(elt => {
                elt.classList.remove("show");
            })
            if (aok) {
                errorEl.classList.remove("show");
                fieldsetEl.classList.remove("error");
            } else {
                errorEl.classList.add("show");
                fieldsetEl.classList.add("error");
            }
        });
    })

document.querySelectorAll(".copy").forEach(elt => {
    elt.addEventListener("click", async (evt) => {
        const previousEl = evt.currentTarget.previousElementSibling;
        const nextEl = evt.currentTarget.nextElementSibling;
        try {
            await navigator.clipboard.writeText(previousEl.textContent);
            nextEl.textContent = "Copied to clipboard";
            nextEl.classList.add("show");
            nextEl.classList.remove("error");
        } catch (e) {
            nextEl.textContent = "Error copying to clipboard";
            nextEl.classList.add("show", "error");
        }
    });
});

function genPassword(length, charSet) {
    let pwd = "";
    let charIdx;
    for (let i = 0; i < length; i++) {
        charIdx = Math.floor(Math.random() * charSet.length);
        pwd += charSet[charIdx];
    }
    return pwd;
}

document.getElementById("generate").addEventListener(
    "click",
    () => {
        document.querySelectorAll(".copy-result").forEach(elt => {
            elt.classList.remove("show");
        })
        const charSet = [...lowercase];
        if (withUppercase.checked) {
            charSet.push(...uppercase);
        }
        if (withNumbers.checked) {
            charSet.push(...numbers);
        }
        if (withSymbols.checked) {
            charSet.push(...symbols);
        }
        pwd1.textContent = genPassword(pwdLength.value, charSet);
        pwd2.textContent = genPassword(pwdLength.value, charSet);
        document.querySelectorAll(".copy").forEach(elt => {
            elt.classList.add("show");
        })
    });