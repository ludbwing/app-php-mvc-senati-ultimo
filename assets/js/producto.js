//OBTENER RODUCTO JS
//assets/js/producto.js

document.addEventListener('DOMContentLoaded',function(){
    const botonGuardar = document.getElementById('btnGuardarProducto');
    botonGuardar.addEventListener('click', crearProducto);
  //  alert('Ludwing');
    obtenerProducto();
})

async function obtenerProducto() {
    try {
        const respuesta = await fetch('productos/obtener-Todo');
        const resultado = await respuesta.json();
        
        if (resultado.status === 'error') {
            throw new Error(resultado.message);
        }

        const productos = resultado.data;
       // console.log(productos);

        const tbody = document.getElementById('productsTableBody');
        tbody.innerHTML = '';
        
        productos.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.id_producto}</td>
                <td>
                    ${product.imagen
                        ? `<img src="assets/uploads/products/${product.imagen}" 
                            alt="${product.nombre}" 
                            class="img-thumbnail" 
                            style="max-width: 50px; max-height: 50px;">`
                        : '<span class="text-muted">Sin imagen</span>'}
                </td>
                <td>${product.nombre}</td>
                <td>${product.descripcion || '<span class="text-muted">Sin descripción</span>'}</td>
                <td>$${parseFloat(product.precio).toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-primary" onclick="editProduct(${product.id_producto}, ${JSON.stringify(product).replace(/"/g, '&quot;')})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id_producto})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        showAlert('error', 'Error al cargar los productos: ' + error.message);
    }
}
/////////////////////////////////////////////////////
async function crearProducto(event) {
    event.preventDefault(); // Evita que la página se recargue.

    // Recoge los valores de los inputs.
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const imagen = document.getElementById('imagen').value;

    try {
        // Realiza la petición al backend.
        const respuesta = await fetch('producto/crearProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
            }),
        });

        const respuestaJson = await respuesta.json();

        // Valida la respuesta.
        if (respuestaJson.status === 'error') {
            showAlertAuth('registerAlert', 'error', respuestaJson.message);
            return;
        }

        // Muestra mensaje de éxito y redirige.
        showAlertAuth("registerAlert", "success", respuestaJson.message);
        setTimeout(() => {
            window.location.href = 'productos'; // Cambia a la página de productos.
        }, 1000);
    } catch (error) {
        const message = error.message || 'Error desconocido';
    }
    
}

/////////////////////////////////////////////


function showAlert(type, message) {
    const alertContainer = document.getElementById('alertContainer');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    alertContainer.appendChild(alertDiv);

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}