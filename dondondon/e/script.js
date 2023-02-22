import userbase from "https://sdk.userbase.com/2/userbase.js";

userbase.init({ appId: "04df42d1-d27a-4022-a89d-c0cceabb8765" });

function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    userbase
        .signIn({ username, password, rememberMe: "local" })
        .then(showOtherThings())
        .catch((e) => (document.getElementById("login-error").innerHTML = e));
}
function handleLogout() {
    userbase.signOut()
}

document.getElementById("login-form").addEventListener("submit", handleLogin);
document.getElementById("logout-button").addEventListener("click", handleLogout);