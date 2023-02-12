const signupHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (firstName && lastName && email && password) {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/')
        } else {
            console.log('Test')
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupHandler);