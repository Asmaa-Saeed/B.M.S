//**   validate the login form

// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const submitBtn = document.getElementById('submit-btn');

// Email validation regex pattern
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add error message element after input
function showError(input, message) {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = 'red';
}

// Show checkbox error
function showCheckboxError(checkbox, message) {
    const existingError = checkbox.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    checkbox.parentElement.appendChild(errorDiv);
}

// Remove error message
function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
        input.style.borderColor = '#ccc';
    }
}

// Validate email
function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
        showError(emailInput, 'Email is required');
        return false;
    } else if (!emailPattern.test(email)) {
        showError(emailInput, 'Please enter a valid email address');
        return false;
    }
    removeError(emailInput);
    return true;
}

// Validate password
function validatePassword() {
    const password = passwordInput.value.trim();
    if (password === '') {
        showError(passwordInput, 'Password is required');
        return false;
    } else if (password.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        return false;
    }
    removeError(passwordInput);
    return true;
}

// Validate remember me checkbox
function validateRememberMe() {
    if (!rememberMeCheckbox.checked) {
        showCheckboxError(rememberMeCheckbox, 'Please agree to remember me');
        return false;
    }
    const errorDiv = rememberMeCheckbox.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    return true;
}

// Add input event listeners for real-time validation
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
rememberMeCheckbox.addEventListener('change', validateRememberMe);

// Toggle password visibility
const togglePassword = document.querySelector('.toggle-password');
togglePassword.addEventListener('click', function(e) {
    const passwordInput = this.previousElementSibling;
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    // Toggle eye icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isRememberMeChecked = validateRememberMe();
    
    if (isEmailValid && isPasswordValid && isRememberMeChecked) {
        // Here you would typically make an API call to your backend
        console.log('Form submitted successfully');
        
        // For demonstration, show success message
        const successMessage = document.createElement('div');
        successMessage.style.color = 'green';
        successMessage.style.marginTop = '10px';
        successMessage.textContent = 'Login successful!';
        loginForm.appendChild(successMessage);
        
        // Clear form after successful submission
        setTimeout(() => {
            loginForm.reset();
            successMessage.remove();
            // Redirect to dashboard or home page
            window.location.href = 'index.html';
        }, 1000);
    }
});