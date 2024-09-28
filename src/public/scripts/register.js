document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const user_type = document.getElementById('userType').value;  // Cambiado a user_type

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, user_type }),  // Asegurarse de enviar user_type
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = '/login'; // Redirigir al login
        } else {
            alert('Error en el registro: ' + data.error);
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
});
