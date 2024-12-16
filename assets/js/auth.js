async function login(event){
    event.preventDefault();
    
    const nombreUsuario = document.getElementById('username').value;
    const claveUsuario = document.getElementById('password').value;
    console.log(nombreUsuario, claveUsuario);

     try {
         const respuesta = await fetch('auth/login',{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 nombreUsuario, claveUsuario
             })
         });

         const respuestaJson = await respuesta.json();

         if(respuestaJson.status === 'error'){
             showAlertAuth('loginAlert', 'error', respuestaJson.message);
             return false;
         }

         //redireccionar a la pagina web
         window.location.href = 'home';

     } catch (error) {
         showAlertAuth('loginAlert','error','error al iniciar session'.error);
         return false;
     }


    // if (!nombreUsuario || !claveUsuario) {
    //     Swal.fire({
    //         title: "Error",
    //         text: "Por favor, completa todos los campos.",
    //         icon: "error"
    //     });
    //     return;
    // }
    // try {
    //     const respuesta = await fetch('auth/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ nombreUsuario, claveUsuario })
    //     });
    //     const respuestaJson = await respuesta.json();
    //     if (respuestaJson.status === 'error') {
    //         Swal.fire({
    //             title: "Error",
    //             text: respuestaJson.message,
    //             icon: "error"
    //         });
    //         return false;
    //     }
    //     // Si el login es exitoso
    //     Swal.fire({
    //         title: "¡Bienvenido!",
    //         text: "Inicio de sesión exitoso.",
    //         icon: "success"
    //     }).then(() => {
    //         // Redirigir a la página web
    //         window.location.href = '/web';
    //     });
    // } catch (error) {
    //     Swal.fire({
    //         title: "Error",
    //         text: "Ocurrió un error al iniciar sesión. Inténtalo más tarde.",
    //         icon: "error"
    //     });
    //     return false;
    // }

    
}



async function register(e){
    e.preventDefault();
    const nombreCompleto = document.getElementById('full_name').value;
    const usuario = document.getElementById('username').value
    const email = document.getElementById('email').value;
    const clave = document.getElementById('password').value
    const confirmarClave = document.getElementById('confirm_password').value
    const rol = document.getElementById('rol').value
    // console.log(nombreCompleto, usuario, email, clave, confirmarClave);
    try {
        const respuesta = await fetch('auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            nombreCompleto,
            usuario,
            email,
            clave,
            confirmarClave,
            rol,
          })
        });
        const respuestaJson = await respuesta.json();
        if(respuestaJson.status === 'error') {
            showAlertAuth('registerAlert', 'error', respuestaJson.message);
            return false;
        }
        showAlertAuth("registerAlert", "success", respuestaJson.message);
           setTimeout(() => {
             window.location.href = 'login';
           }, 1000);
    } catch (error) {
        showAlertAuth('registerAlert','error','error al registrarce'.error);
         return false;
    }
}



function showAlertAuth(containerId, type, message) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        const alert = container.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 5000);

}











