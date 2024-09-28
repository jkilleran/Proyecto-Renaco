window.onload = async function() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('No hay token en localStorage. Redirigiendo al login...');
        window.location.href = '/login'; // Si no hay token, redirigir al login
        return;
    }

    console.log('Token encontrado en localStorage:', token);

    try {
        console.log('Verificando acceso al dashboard con el token...');
        const response = await fetch('/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Asegúrate de enviar el token en cada solicitud
            }
        });

        if (!response.ok) {
            console.error('Error en la respuesta del servidor al intentar acceder al dashboard.');
            const data = await response.json();
            document.getElementById('error-message').textContent = data.message || 'Acceso denegado';
            window.location.href = '/login'; // Redirigir al login si no está autorizado
        } else {
            console.log('Acceso autorizado. Mostrando el dashboard...');
        }
    } catch (error) {
        console.error('Error al intentar acceder al dashboard:', error);
        document.getElementById('error-message').textContent = 'Error al intentar acceder al dashboard';
    }
};
