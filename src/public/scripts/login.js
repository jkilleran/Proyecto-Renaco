document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        console.log('Iniciando sesión...');
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Inicio de sesión exitoso. Token recibido:', data.token);
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            console.log('Token almacenado en localStorage.');

            // Redirigir al dashboard
            window.location.href = '/dashboard';
        } else {
            errorMessage.textContent = data.error || 'Error al iniciar sesión.';
            console.error('Error en la respuesta del servidor:', data.error);
        }
    } catch (error) {
        errorMessage.textContent = 'Error al iniciar sesión. Inténtalo de nuevo.';
        console.error('Error al realizar la solicitud de inicio de sesión:', error);
    }
});
