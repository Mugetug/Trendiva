import {
    BASE_URL
} from "./api.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        const loginMessage = document.getElementById("loginMessage");

        try {
            const response = await fetch(`${BASE_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                loginMessage.textContent = "Giriş başarılı";
                localStorage.setItem("user", JSON.stringify(data.user));
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            } else {
                loginMessage.textContent = data.message || "Giriş başarısız";
            }
        } catch (error) {
            loginMessage.textContent = "Sunucu hatası";
            console.error(error);
        }
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("registerUsername").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value.trim();
        const registerMessage = document.getElementById("registerMessage");

        try {
            const response = await fetch(`${BASE_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: username,
                    lastName: "User",
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                registerMessage.textContent = "Kayıt başarılı";
                registerForm.reset();
            } else {
                registerMessage.textContent = data.message || "Kayıt başarısız";
            }
        } catch (error) {
            registerMessage.textContent = "Sunucu hatası";
            console.error(error);
        }
    });
}