// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Elements
  const loginDiv = document.getElementById("loginDiv");
  const progressDiv = document.getElementById("progressDiv");
  const loginForm = document.getElementById("loginForm");
  const progressForm = document.getElementById("progressForm");
  const signupBtn = document.getElementById("signupBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const messageDiv = document.getElementById("message");
  const userProgressDiv = document.getElementById("userProgress");
  
  // Sign up user
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        messageDiv.textContent = "Account created! Please log in.";
      })
      .catch(error => {
        messageDiv.textContent = "Error: " + error.message;
      });
  });
  
  // Login user
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        messageDiv.textContent = "Logged in successfully!";
        showProgressForm();
        // Redirect to home.html after login
        window.location.href = 'home.html';  // Redirect to the home page
      })
      .catch(error => {
        messageDiv.textContent = "Error: " + error.message;
      });
  });
  
  // Logout user
  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      messageDiv.textContent = "Logged out successfully!";
      showLoginForm();
    });
  });
  
  // Submit user progress
  progressForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const progress = document.getElementById("progress").value;
    const user = auth.currentUser;
  
    if (user) {
      db.collection("users").doc(user.uid).set({
        email: user.email,
        progress: progress
      })
      .then(() => {
        messageDiv.textContent = "Progress saved!";
        loadUserProgress();
      })
      .catch(error => {
        messageDiv.textContent = "Error saving progress: " + error.message;
      });
    }
  });
  
  // Auth state listener
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      showProgressForm();
      loadUserProgress();
    } else {
      // No user is logged in
      showLoginForm();
    }
  });
  
  // Show login form, hide progress form
  function showLoginForm() {
    loginDiv.style.display = "block";
    progressDiv.style.display = "none";
  }
  
  // Show progress form, hide login form
  function showProgressForm() {
    loginDiv.style.display = "none";
    progressDiv.style.display = "block";
  }
  
  // Load and display user's progress from Firestore
  function loadUserProgress() {
    const user = auth.currentUser;
    if (user) {
      db.collection("users").doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          userProgressDiv.textContent = `Progress: ${doc.data().progress}`;
        } else {
          userProgressDiv.textContent = "No progress found.";
        }
      }).catch((error) => {
        messageDiv.textContent = "Error fetching progress: " + error.message;
      });
    }
  }
  