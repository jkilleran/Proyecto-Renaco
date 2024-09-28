// Función para editar un proveedor
window.editSupplier = async (id) => {
    console.log(`Editando proveedor con ID: ${id}`);
    try {
        const response = await fetch(`/api/suppliers/${id}`);
        console.log('Estado de la respuesta al obtener proveedor:', response.status); // Log para el estado de la respuesta

        if (!response.ok) throw new Error('Error al obtener proveedor');

        const supplier = await response.json();
        console.log('Proveedor obtenido:', supplier); // Log para mostrar los datos del proveedor

        if (!supplier || !supplier.id) {
            console.error('Proveedor no encontrado');
            alert('Proveedor no encontrado');
            return;
        }

        // Rellenar los campos del formulario de edición
        document.getElementById('editSupplierId').value = supplier.id || '';
        document.getElementById('editName').value = supplier.name || '';
        document.getElementById('editCode').value = supplier.code || '';
        document.getElementById('editAddress').value = supplier.address || '';
        document.getElementById('editPhone').value = supplier.phone || '';
        document.getElementById('editEmail').value = supplier.email || '';

        // Mostrar el formulario de edición
        document.querySelector('.edit-supplier').style.display = 'block';
    } catch (error) {
        console.error('Error al obtener el proveedor para editar:', error.message);
        alert('Error al obtener el proveedor. Por favor, inténtalo de nuevo.');
    }
};

// Función para eliminar un proveedor
window.deleteSupplier = async (id) => {
    console.log(`Eliminando proveedor con ID: ${id}`);
    try {
        const response = await fetch(`/api/suppliers/${id}`, {
            method: 'DELETE',
        });

        console.log('Estado de la respuesta al eliminar proveedor:', response.status); // Log para el estado de la respuesta

        if (!response.ok) throw new Error('Error al eliminar proveedor');

        console.log('Proveedor eliminado correctamente');
        loadSuppliers(); // Recargar la lista de proveedores después de eliminar
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error.message);
    }
};

// Función para cancelar la edición
window.cancelEdit = () => {
    console.log('Cancelando edición');
    document.querySelector('.edit-supplier').style.display = 'none'; // Ocultar el formulario de edición
    document.getElementById('editSupplierForm').reset();
};

// Manejar el envío del formulario para agregar un proveedor
document.getElementById('addSupplierForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Formulario de agregar proveedor enviado');

    const name = document.getElementById('name').value;
    const code = document.getElementById('code').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    try {
        console.log('Datos del proveedor a agregar:', { name, code, address, phone, email });
        const response = await fetch('/api/suppliers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, code, address, phone, email }),
        });

        console.log('Estado de la respuesta al agregar proveedor:', response.status); // Log para el estado de la respuesta

        if (!response.ok) throw new Error('Error al agregar proveedor');

        console.log('Proveedor agregado correctamente');
        document.getElementById('addSupplierForm').reset(); // Resetea el formulario de agregar proveedor
        loadSuppliers(); // Recargar la lista de proveedores después de agregar
    } catch (error) {
        console.error('Error al agregar el proveedor:', error.message);
    }
});

// Manejar el envío del formulario de edición
document.getElementById('editSupplierForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Formulario de edición enviado');

    const id = document.getElementById('editSupplierId').value;
    const name = document.getElementById('editName').value;
    const code = document.getElementById('editCode').value;
    const address = document.getElementById('editAddress').value;
    const phone = document.getElementById('editPhone').value;
    const email = document.getElementById('editEmail').value;

    console.log('Datos del proveedor a editar:', { id, name, code, address, phone, email });

    try {
        const response = await fetch(`/api/suppliers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, code, address, phone, email }),
        });

        console.log('Estado de la respuesta al editar proveedor:', response.status); // Log para el estado de la respuesta

        if (!response.ok) throw new Error('Error al editar proveedor');

        console.log('Proveedor editado correctamente');
        document.getElementById('editSupplierForm').reset(); // Resetea el formulario de edición
        document.querySelector('.edit-supplier').style.display = 'none'; // Ocultar el formulario de edición
        loadSuppliers(); // Recargar la lista de proveedores después de editar
    } catch (error) {
        console.error('Error al editar el proveedor:', error.message);
    }
});

// Función para cargar los proveedores en la tabla
async function loadSuppliers() {
    console.log('Cargando proveedores...');
    try {
        const response = await fetch('/api/suppliers');
        console.log('Estado de la respuesta al cargar proveedores:', response.status); // Log para el estado de la respuesta

        if (!response.ok) throw new Error('Error al cargar proveedores');

        const suppliers = await response.json();
        console.log('Proveedores cargados:', suppliers); // Log para mostrar los proveedores cargados

        // Limpiar la tabla de proveedores
        const tableBody = document.getElementById('suppliersTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        // Comprobar si hay proveedores
        if (suppliers.length === 0) {
            console.log('No hay proveedores registrados.');
            tableBody.innerHTML = '<tr><td colspan="8" class="no-suppliers">No hay proveedores registrados.</td></tr>';
            return; // Detener aquí si no hay proveedores
        }

        // Agregar los proveedores a la tabla
        suppliers.forEach(supplier => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.code}</td>
                <td>${supplier.address}</td>
                <td>${supplier.phone}</td>
                <td>${supplier.email}</td>
                <td>${supplier.connected_users || 0}</td> <!-- Control para no mostrar "undefined" -->
                <td class="actions">
                    <button class="btn-edit" onclick="editSupplier(${supplier.id})">Editar</button>
                    <button class="btn-delete" onclick="deleteSupplier(${supplier.id})">Eliminar</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error al cargar proveedores:', error.message);
    }
}

// Cargar los proveedores al iniciar la página
loadSuppliers();
