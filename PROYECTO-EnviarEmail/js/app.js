document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }
    
    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner')
    // Asignar los eventos a los inputs
    inputEmail.addEventListener('blur', validar);
    inputCC.addEventListener('blur', validarCC);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    
    
    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        resetearFormulario();
        
    })
    function resetearFormulario() {
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }
    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.remove('hidden');
        
        setTimeout(() => {
            spinner.classList.add('hidden');
            
            resetearFormulario();
            
            const alertaExito = document.createElement('P');
            alertaExito.textContent = 'El mensaje se envió correctamente';
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'uppercase', 'mt-10', 'rounded-lg', 'font-bold', 'text-sm');
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        },3000);

    }
    
    function validarCC (e){
        if (!(e.target.value.trim() === '') && e.target.id === 'cc' && !validarEmail(e.target.value)){
            mostrarAlerta(`El email no es válido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
    }

    function validar (e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo de ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if( e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El email no es válido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores 
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
    }

    function mostrarAlerta(e, referencia){
        //Comprobar si ya existe una alerta
        limpiarAlerta(referencia);

        const error = document.createElement('DIV');
        error.textContent = e;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'uppercase', 'mt-5');

        // Inyectar el error al formulario

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }
    function comprobarEmail(){
        // Comprobar que los campos no estén vacíos excepto el CC
        if(email.cc === ''){
            delete email.cc; // Eliminar la propiedad si está vacía
        }
        if(Object.values(email).includes('')){
            btnEnviar.classList.add('opacity-50');
            btnEnviar.disabled = true;
            return;
        }
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled = false;
    }
});

