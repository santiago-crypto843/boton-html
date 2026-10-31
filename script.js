const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaTareas = document.getElementById('listaTareas');

function agregarTarea() {
    const texto = inputTarea.value.trim();

    if (texto === '') {
        alert("Por favor, escribe una tarea.");
        return;
    }

    // Crear elementos de la lista
    const li = document.createElement('li');

    const spanTexto = document.createElement('span');
    spanTexto.textContent = texto;
    li.appendChild(spanTexto);

    // Contenedor para los botones de acción
    const contenedorBotones = document.createElement('div');

    // Botón Editar (Naranja)
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-editar';

    // Botón Guardar (Rojo - inicialmente oculto)
    const btnGuardar = document.createElement('button');
    btnGuardar.textContent = 'Guardar';
    btnGuardar.className = 'btn-eliminar'; // Usamos la clase roja existente
    btnGuardar.style.display = 'none'; // Oculto por defecto

    // Botón Eliminar (Rojo)
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'btn-eliminar';

    // Funcionalidad de Eliminar
    btnEliminar.addEventListener('click', () => {
        li.remove();
    });

    // Funcionalidad de Editar (Muestra el input y el botón Guardar rojo)
    btnEditar.addEventListener('click', () => {
        const inputEdicion = document.createElement('input');
        inputEdicion.type = 'text';
        inputEdicion.value = spanTexto.textContent;
        inputEdicion.className = 'input-editar';

        li.replaceChild(inputEdicion, spanTexto);
        inputEdicion.focus();

        // Ocultamos Editar y mostramos Guardar
        btnEditar.style.display = 'none';
        btnGuardar.style.display = 'inline-block';
    });

    // Funcionalidad de Guardar (Actualiza el texto y vuelve a la normalidad)
    btnGuardar.addEventListener('click', () => {
        const inputEdicion = li.querySelector('.input-editar');
        if (inputEdicion.value.trim() !== '') {
            spanTexto.textContent = inputEdicion.value.trim();
        }
        li.replaceChild(spanTexto, inputEdicion);

        // Ocultamos Guardar y volvemos a mostrar Editar
        btnGuardar.style.display = 'none';
        btnEditar.style.display = 'inline-block';
    });

    // Agregar botones al contenedor y el contenedor al <li>
    contenedorBotones.appendChild(btnEditar);
    contenedorBotones.appendChild(btnGuardar);
    contenedorBotones.appendChild(btnEliminar);
    li.appendChild(contenedorBotones);

    // Agregar la tarea a la lista principal
    listaTareas.appendChild(li);

    // Limpiar input
    inputTarea.value = '';
    inputTarea.focus();
}

btnAgregar.addEventListener('click', agregarTarea);

inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});