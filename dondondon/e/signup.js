import userbase from "https://sdk.userbase.com/2/userbase.js";

userbase.init({ appId: "04df42d1-d27a-4022-a89d-c0cceabb8765" });

function handleSignUp(e) {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    userbase
        .signUp({ username, password, rememberMe: "local" })
        .catch((e) => (document.getElementById("signup-error").innerHTML = e));
}

document.getElementById("signup-form").addEventListener("submit", handleSignUp);