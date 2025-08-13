document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements - Common
  const themeToggle = document.getElementById("theme-toggle");
  const navbar = document.getElementById("navbar");
  const logoutBtn = document.getElementById("logout-btn");
  const chatbotButton = document.getElementById("chatbot-button");
  const chatbotInterface = document.getElementById("chatbot-interface");
  const openChatBtn = document.getElementById("open-chat");
  const closeChatBtn = document.getElementById("close-chat");
  const chatInput = document.getElementById("chat-input");
  const sendMessageBtn = document.getElementById("send-message");
  const chatMessages = document.getElementById("chat-messages");

  // Check for saved theme preference
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark");
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", "dark");
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      window.location.href = "index.html";
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    const spamForm = document.getElementById("spam-form");
    
    if (spamForm) {
        spamForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let spamScore = 0;
            const spamIndicators = [
                { keyword: "win", weight: 0.3 },
                { keyword: "free", weight: 0.4 },
                { keyword: "urgent", weight: 0.5 },
                { keyword: "congratulations", weight: 0.6 },
                { keyword: "offer", weight: 0.4 },
                { keyword: "limited time", weight: 0.5 },
                { keyword: "click here", weight: 0.7 },
                { keyword: "buy now", weight: 0.8 }
            ];

            const emailContent = document.getElementById("email-content").value.toLowerCase();

            let totalWeight = 0;
            spamIndicators.forEach((indicator) => {
                if (emailContent.includes(indicator.keyword)) {
                    spamScore += indicator.weight;
                }
                totalWeight += indicator.weight;
            });

            const normalizedScore = totalWeight > 0 ? (spamScore / totalWeight) * 100 : 0;
            const resultElement = document.getElementById("spam-score");

            if (normalizedScore > 50) {
                resultElement.innerHTML = `<strong style="color: red;">Spam Detected!</strong> Score: ${Math.round(normalizedScore)}%`;
            } else {
                resultElement.innerHTML = `<strong style="color: green;">Not Spam</strong> Score: ${Math.round(normalizedScore)}%`;
            }
        });
    }
});


  // Chatbot functionality
  if (chatbotButton && chatbotInterface) {
    // Show chatbot button if logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
      chatbotButton.classList.remove("hidden");
    }

    // Open chat
    openChatBtn.addEventListener("click", () => {
      chatbotButton.classList.add("hidden");
      chatbotInterface.classList.remove("hidden");
    });

    // Close chat
    closeChatBtn.addEventListener("click", () => {
      chatbotInterface.classList.add("hidden");
      chatbotButton.classList.remove("hidden");
    });

    // Send message
    function sendMessage() {
      const message = chatInput.value.trim();
      if (message) {
        // Add user message
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMessageHTML = `
          <div class="message user-message">
            <div class="message-content">${message}</div>
            <div class="message-time">${currentTime}</div>
          </div>
        `;
        chatMessages.innerHTML += userMessageHTML;
        
        // Clear input
        chatInput.value = "";
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot response after a delay
        setTimeout(() => {
          const botResponses = [
            "I'm here to help with any questions about email security.",
            "You can use our spam detector to check suspicious emails.",
            "Would you like to know more about our security features?",
            "Feel free to ask about how to identify phishing attempts.",
            "Is there anything specific you'd like to know about InboxGuard?"
          ];
          
          const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
          const botMessageHTML = `
            <div class="message bot-message">
              <div class="message-content">${randomResponse}</div>
              <div class="message-time">${currentTime}</div>
            </div>
          `;
          
          chatMessages.innerHTML += botMessageHTML;
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
      }
    }

    sendMessageBtn.addEventListener("click", sendMessage);
    
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Check if we're on the index page
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || window.location.pathname.endsWith("/")) {
    // DOM Elements - Index page
    const loginSection = document.getElementById("login-section");
    const appContainer = document.getElementById("app-container");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const loginFormContainer = document.getElementById("login-form-container");
    const signupFormContainer = document.getElementById("signup-form-container");
    const showSignupLink = document.getElementById("show-signup");
    const showLoginLink = document.getElementById("show-login");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profileLocation = document.getElementById("profile-location");
    const notificationsToggle = document.getElementById("notifications-toggle");
    const spamDetectorForm = document.getElementById("spam-detector-form");
    const analysisResults = document.getElementById("analysis-results");
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (isLoggedIn) {
      // Show app container and navbar, hide login section
      loginSection.classList.add("hidden");
      appContainer.classList.remove("hidden");
      navbar.classList.remove("hidden");
      chatbotButton.classList.remove("hidden");
      
      // Update profile information
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");
      
      if (profileName && userName) profileName.textContent = userName;
      if (profileEmail && userEmail) profileEmail.textContent = userEmail;
    } else {
      // Hide navbar, show login section
      navbar.classList.add("hidden");
      loginSection.classList.remove("hidden");
      appContainer.classList.add("hidden");
      chatbotButton.classList.add("hidden");
    }

    // Tab switching
    if (loginTab && signupTab) {
      loginTab.addEventListener("click", () => {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginFormContainer.classList.remove("hidden");
        signupFormContainer.classList.add("hidden");
      });

      signupTab.addEventListener("click", () => {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupFormContainer.classList.remove("hidden");
        loginFormContainer.classList.add("hidden");
      });
    }

    // Link switching
    if (showSignupLink) {
      showSignupLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupTab.click();
      });
    }

    if (showLoginLink) {
      showLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginTab.click();
      });
    }

    // Password strength meter for signup
    const signupPassword = document.getElementById("signup-password");
    const passwordStrengthMeter = document.getElementById("password-strength-meter");
    const passwordStrengthText = document.getElementById("password-strength-text");

    if (signupPassword && passwordStrengthMeter && passwordStrengthText) {
      signupPassword.addEventListener("input", () => {
        const password = signupPassword.value;
        let strength = 0;
        let strengthClass = "";
        let strengthText = "";

        // Check password length
        if (password.length > 0) {
          strength += password.length > 7 ? 25 : 10;
        }

        // Check for mixed case
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
          strength += 25;
        }

        // Check for numbers
        if (password.match(/\d/)) {
          strength += 25;
        }

        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
          strength += 25;
        }

        // Set strength text and class
        if (strength < 30) {
          strengthClass = "strength-weak";
          strengthText = "Weak";
        } else if (strength < 70) {
          strengthClass = "strength-medium";
          strengthText = "Medium";
        } else {
          strengthClass = "strength-strong";
          strengthText = "Strong";
        }

        // Update UI
        passwordStrengthMeter.innerHTML = `<div class="${strengthClass}" style="width: ${strength}%"></div>`;
        passwordStrengthText.textContent = `Password strength: ${strengthText}`;
      });
    }

    // Login form submission
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const rememberMe = document.getElementById("login-remember").checked;

        // In a real app, you would validate credentials here

        // Update profile information with the logged in user's email
        if (profileEmail) profileEmail.textContent = email;

        // Extract name from email for profile display
        const nameFromEmail = email.split("@")[0].replace(/[.]/g, " ");
        const formattedName = nameFromEmail
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        
        if (profileName) profileName.textContent = formattedName;

        // Save to localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", formattedName);

        // Show app container and navbar, hide login section
        loginSection.classList.add("hidden");
        appContainer.classList.remove("hidden");
        navbar.classList.remove("hidden");
        chatbotButton.classList.remove("hidden");
      });
    }

    // Sign up form submission
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("signup-confirm-password").value;

        // Check if passwords match
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        // In a real app, you would create the user in the database
        alert("Account created successfully! Please log in.");
        loginTab.click();
      });
    }

    // Spam detector form submission
    if (spamDetectorForm) {
      spamDetectorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const subject = document.getElementById("email-subject").value;
        const content = document.getElementById("email-content").value;

        // In a real app, you would analyze the email content here
        // For demo purposes, we'll just show a random result

        // Show analysis results
        if (analysisResults) {
          analysisResults.classList.remove("hidden");
          
          // Scroll to results
          setTimeout(() => {
            analysisResults.scrollIntoView({ behavior: "smooth" });
          }, 100);
          
          // Randomly determine if email is spam or not
          const isSpam = Math.random() > 0.7;
          const spamScore = isSpam ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30);
          
          // Update UI based on result
          const resultStatus = document.getElementById("result-status");
          const resultDescription = document.getElementById("result-description");
          const spamScoreElement = document.getElementById("spam-score");
          const phishingRisk = document.getElementById("phishing-risk");
          const malwareRisk = document.getElementById("malware-risk");
          const resultIcon = document.querySelector(".result-icon");
          
          if (isSpam) {
            resultStatus.textContent = "Potential Spam Detected";
            resultDescription.textContent = "This email contains characteristics commonly found in spam messages.";
            spamScoreElement.textContent = `${spamScore}%`;
            phishingRisk.textContent = "High";
            malwareRisk.textContent = "Medium";
            
            resultIcon.classList.remove("safe");
            resultIcon.classList.add("warning");
            resultIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            
            // Update analysis details
            document.getElementById("analysis-details").innerHTML = `
              <li class="danger">
                <i class="fas fa-times-circle"></i>
                <span>Contains suspicious links or attachments</span>
              </li>
              <li class="danger">
                <i class="fas fa-times-circle"></i>
                <span>Urgent requests for personal information</span>
              </li>
              <li class="warning">
                <i class="fas fa-exclamation-circle"></i>
                <span>Sender domain appears suspicious</span>
              </li>
              <li class="warning">
                <i class="fas fa-exclamation-circle"></i>
                <span>Contains promotional content</span>
              </li>
            `;
          } else {
            resultStatus.textContent = "Safe Email";
            resultDescription.textContent = "This email appears to be legitimate and safe.";
            spamScoreElement.textContent = `${spamScore}%`;
            phishingRisk.textContent = "Low";
            malwareRisk.textContent = "None";
            
            resultIcon.classList.remove("warning");
            resultIcon.classList.add("safe");
            resultIcon.innerHTML = '<i class="fas fa-shield-alt"></i>';
            
            // Update analysis details
            document.getElementById("analysis-details").innerHTML = `
              <li class="safe">
                <i class="fas fa-check-circle"></i>
                <span>No suspicious links detected</span>
              </li>
              <li class="safe">
                <i class="fas fa-check-circle"></i>
                <span>No urgent requests for personal information</span>
              </li>
              <li class="safe">
                <i class="fas fa-check-circle"></i>
                <span>Sender domain is legitimate</span>
              </li>
              <li class="warning">
                <i class="fas fa-exclamation-circle"></i>
                <span>Contains some promotional content</span>
              </li>
            `;
          }
        }
      });
    }

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Your message has been sent! We'll get back to you soon.");
        contactForm.reset();
      });
    }
  }

  // Check if we're on the edit profile page
  if (window.location.pathname.includes("edit-profile.html")) {
    // DOM Elements - Edit Profile page
    const editProfileForm = document.getElementById("edit-profile-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const locationInput = document.getElementById("location");
    const bioInput = document.getElementById("bio");
    const notificationsInput = document.getElementById("notifications");

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      window.location.href = "index.html";
    } else {
      // Load user data
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");
      
      if (nameInput && userName) nameInput.value = userName;
      if (emailInput && userEmail) emailInput.value = userEmail;
    }

    // Form submission
    if (editProfileForm) {
      editProfileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Save updated profile data
        localStorage.setItem("userName", nameInput.value);
        localStorage.setItem("userEmail", emailInput.value);
        
        // Show success message and redirect
        alert("Profile updated successfully!");
        window.location.href = "index.html#profile-section";
      });
    }
  }

  // Check if we're on the edit password page
  if (window.location.pathname.includes("edit-password.html")) {
    // DOM Elements - Edit Password page
    const editPasswordForm = document.getElementById("edit-password-form");
    const currentPasswordInput = document.getElementById("current-password");
    const newPasswordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const passwordStrengthMeter = document.getElementById("password-strength-meter");
    const passwordStrengthText = document.getElementById("password-strength-text");
    const passwordError = document.getElementById("password-error");
    const errorMessage = document.getElementById("error-message");

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      window.location.href = "index.html";
    }

    // Password strength meter
    if (newPasswordInput && passwordStrengthMeter && passwordStrengthText) {
      newPasswordInput.addEventListener("input", () => {
        const password = newPasswordInput.value;
        let strength = 0;
        let strengthClass = "";
        let strengthText = "";

        // Check password length
        if (password.length > 0) {
          strength += password.length > 7 ? 25 : 10;
        }

        // Check for mixed case
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
          strength += 25;
        }

        // Check for numbers
        if (password.match(/\d/)) {
          strength += 25;
        }

        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
          strength += 25;
        }

        // Set strength text and class
        if (strength < 30) {
          strengthClass = "strength-weak";
          strengthText = "Weak";
        } else if (strength < 70) {
          strengthClass = "strength-medium";
          strengthText = "Medium";
        } else {
          strengthClass = "strength-strong";
          strengthText = "Strong";
        }

        // Update UI
        passwordStrengthMeter.innerHTML = `<div class="${strengthClass}" style="width: ${strength}%"></div>`;
        passwordStrengthText.textContent = `Password strength: ${strengthText}`;
      });
    }

    // Form submission
    if (editPasswordForm) {
      editPasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Hide any previous errors
        if (passwordError) passwordError.classList.add("hidden");
        
        // Validate passwords
        if (newPasswordInput.value !== confirmPasswordInput.value) {
          errorMessage.textContent = "New passwords do not match";
          passwordError.classList.remove("hidden");
          return;
        }
        
        // Check password strength
        const password = newPasswordInput.value;
        let strength = 0;
        
        // Check password length
        if (password.length > 0) {
          strength += password.length > 7 ? 25 : 10;
        }
        
        // Check for mixed case
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
          strength += 25;
        }
        
        // Check for numbers
        if (password.match(/\d/)) {
          strength += 25;
        }
        
        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
          strength += 25;
        }
        
        if (strength < 50) {
          errorMessage.textContent = "Please choose a stronger password";
          passwordError.classList.remove("hidden");
          return;
        }
        
        // In a real app, you would validate the current password against the stored one
        // and update the password in the database
        
        // Show success message and redirect
        alert("Password updated successfully!");
        window.location.href = "index.html#profile-section";
      });
    }
  }
});