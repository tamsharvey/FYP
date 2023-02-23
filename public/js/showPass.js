function showPass()
{
    const showPassword = document.querySelector('#showPassword');

    // Get the password input element
    const inputPassword = document.querySelector('#inputPassword');

    // Toggle the type attribute
    const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    inputPassword.setAttribute('type', type);

    // Toggle the eye slash icon
    if (showPassword.src.match("https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png")) {
        showPassword.src = "https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png";
    } else {
        showPassword.src = "https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png";
    }
}