// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDpGTycW3ZHwgoAU2-oFiSAtE5VuRu9MUU",
    authDomain: "login-page-intern-intelligence.firebaseapp.com",
    projectId: "login-page-intern-intelligence",
    storageBucket: "login-page-intern-intelligence.firebasestorage.app",
    messagingSenderId: "883556085916",
    appId: "1:883556085916:web:cceb3c3543d111d4eb7d59",
    measurementId: "G-DCJ7G3QK09"
  };

  import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging.js";

// Firebase app initialize
const messaging = getMessaging();

// VAPID Public Key add karein
const vapidKey = "BPtov2dTLMMmJiTl7YsOxUPVFmM7_r0gybno3H7ajoVfJTtiz1q2qdmUZKGt5KvlXCFDXkbrYsgR-_yfwTZGGLU";

// User se permission maangna
Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
        console.log("Notification permission granted.");
        getToken(messaging, { vapidKey: vapidKey }).then((currentToken) => {
            if (currentToken) {
                console.log("Firebase Push Token:", currentToken);
                // Is token ko apne server ya database me save karna zaroori hai
            } else {
                console.log("No registration token available. Request permission to generate one.");
            }
        }).catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
        });
    }
});


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to show popup messages
function showPopup(message, type) {
    let popup = document.createElement("div");
    popup.className = `popup ${type}`;
    popup.innerText = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// 📌 **LOGIN FUNCTION**
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showPopup("Login Successful!", "success");
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirect after login
            }, 2000);
        })
        .catch((error) => {
            showPopup("Error: " + error.message, "error");
        });
});

// 📌 **SIGNUP FUNCTION**
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        showPopup("Passwords do not match!", "error");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showPopup("Signup Successful!", "success");
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to login page
            }, 2000);
        })
        .catch((error) => {
            showPopup("Error: " + error.message, "error");
        });
});

// 📌 **FORGOT PASSWORD FUNCTION**
document.getElementById("forgotPasswordForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("forgotEmail").value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            showPopup("Password reset email sent!", "success");
        })
        .catch((error) => {
            showPopup("Error: " + error.message, "error");
        });
});


function forgotPassword() {
    var email = document.getElementById("email").value; // Email input field ka ID
    if (email === "") {
        alert("Please enter your email");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset link sent to your email. Check your inbox!");
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
}
