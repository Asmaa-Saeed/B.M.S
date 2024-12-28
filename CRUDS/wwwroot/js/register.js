// Get form elements
const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

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

// Remove error message
function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
        input.style.borderColor = '#ccc';
    }
}

// Validate name
function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        showError(nameInput, 'Name is required');
        return false;
    } else if (name.length < 3) {
        showError(nameInput, 'Name must be at least 3 characters');
        return false;
    }
    removeError(nameInput);
    return true;
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
    } else if (password.length < 8) {
        showError(passwordInput, 'Password must be at least 8 characters');
        return false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        showError(passwordInput, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        return false;
    }
    removeError(passwordInput);
    return true;
}

// Validate confirm password
function validateConfirmPassword() {
    const confirmPassword = confirmPasswordInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (confirmPassword === '') {
        showError(confirmPasswordInput, 'Please confirm your password');
        return false;
    } else if (confirmPassword !== password) {
        showError(confirmPasswordInput, 'Passwords do not match');
        return false;
    }
    removeError(confirmPasswordInput);
    return true;
}

// Add input event listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Toggle password visibility
const togglePasswords = document.querySelectorAll('.toggle-password');
togglePasswords.forEach(togglePassword => {
    togglePassword.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Toggle eye icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Form submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Here you would typically make an API call to your backend
        console.log('Form submitted successfully');
        
        // For demonstration, show success message
        const successMessage = document.createElement('div');
        successMessage.style.color = 'green';
        successMessage.style.fontWeight = '500';
        successMessage.style.marginTop = '10px';
        successMessage.textContent = 'Registration successful!';
        registerForm.appendChild(successMessage);
        
        // Clear form after successful submission
        setTimeout(() => {
            registerForm.reset();
            successMessage.remove();
            // Redirect to login page
            window.location.href = 'index.html';
        }, 1000);
    }
});
