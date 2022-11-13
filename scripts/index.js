const urlUsuarios = "https://6363a4d637f2167d6f7ed742.mockapi.io/Users";
let btnBuscar = document.getElementById("btnGet1");
let inputBuscar = document.getElementById("inputGet1Id");
const btnAgregar = document.getElementById("btnPost");
let inputAgregarNombre = document.getElementById("inputPostNombre");
let inputAgregarApellido = document.getElementById("inputPostApellido");
const btnModificar = document.getElementById("btnPut");
let inputModificar = document.getElementById("inputPutId");
const btnEliminar = document.getElementById("btnDelete");
let inputEliminar = document.getElementById("inputDelete");
let blackConsole = document.getElementById("results");
const alertError = document.getElementById("alert-error");
//Inputs y botón de sección "Modificar registro"
let inputModificarNombre = document.getElementById("inputPutNombre");
let inputModificarApellido = document.getElementById("inputPutApellido");
const btnGuardar = document.getElementById("btnSendChanges");
let usuarios = []


let getData = function (url, metodo, data) {
    let result = {};

    return fetch(url, { method: metodo, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
};


function toggleBtnAgregar() {
    if (inputAgregarNombre.value && inputAgregarApellido.value) {
        btnAgregar.disabled = false
    } else {
        btnAgregar.disabled = true
    }
};


function toggleButtons(input1, inputBtn) {
    if (input1.value) {
        inputBtn.disabled = false

    } else {
        inputBtn.disabled = true
    }
}


function showConsole(id, name, lastname) {
    blackConsole.innerHTML += `<li>ID: ${id}</li>
                                <li>NAME: ${name}</li>
                                <li>LASTNAME: ${lastname}</li>
                                <br>`
}




btnBuscar.addEventListener("click", () => {
    if (inputBuscar.value == "") {
        getData(urlUsuarios, 'GET').then(function (resultObj) {
            if (resultObj.status === "ok") {
                usuarios = resultObj.data
            }
            alertError.classList.remove("show")
            blackConsole.innerHTML = ""
            for (let i = 0; i < usuarios.length; i++) {
                let users = usuarios[i];
                let { id, name, lastname } = users

                showConsole(id, name, lastname)
            }
        })
    }

    if (inputBuscar.value) {
        getData(urlUsuarios + "/" + inputBuscar.value, 'GET').then(function (resultObj) {
            if (resultObj.status === "ok") {
                usuarios = resultObj.data
            }
            let { id, name, lastname } = usuarios
            if (inputBuscar.value === id) {
                blackConsole.innerHTML = ""
                alertError.classList.remove("show")
                showConsole(id, name, lastname)
                inputBuscar.value = "";
            } else {
                blackConsole.innerHTML = ""
                alertError.classList.add("show")
                inputBuscar.value = "";
            }
        })
    }
})


btnAgregar.addEventListener("click", () => {
    getData(urlUsuarios, 'POST').then(function (resultObj) {
        if (resultObj.status === "ok") {
            usuarios = resultObj.data
        }
    })
});

//Código para establecer funcionalidad al dar click en el botón modificar

btnModificar.addEventListener("click", (e) => {

    //1.Petición web, para luego mostrar datos correspondientes al ID colocado en los inputs del modal

    getData(urlUsuarios + "/" + inputModificar.value, 'GET').then(function (resultObj) {

        if (resultObj.status === "ok") {
            usuarios = resultObj.data
        }

        let { id, name, lastname } = usuarios

        if (inputModificar.value === id) {

            alertError.classList.remove("show");
            inputModificarApellido.value = `${lastname}`;
            inputModificarNombre.value = `${name}`;
            btnGuardar.disabled = false;
            let modal = new bootstrap.Modal(document.getElementById('dataModal'));
            modal.show();


            // En los demás casos, se dejan vacios los campos, no se abre el modal,
            // y se muestra la alerta de error

        } else {

            let modal = new bootstrap.Modal(document.getElementById('dataModal'));
            modal.hide();
            inputModificarApellido.value = "";
            inputModificarNombre.value = "";
            inputModificar.value = "";
            alertError.classList.add("show");
        };
    });
});

//Código para establecer funcionalidad al dar click en el botón guardar, situado dentro del modal
// en la sección "Modificar registro"

btnGuardar.addEventListener("click", (e) => {

    //Código para modificar registro

    getData(urlUsuarios + "/" + inputModificar.value, 'PUT',{"name": inputModificarNombre.value, "lastname": inputModificarApellido.value}).then(function (resultObj) {
        if (resultObj.status === "ok") {

            //Si status==ok, hacemos una petición para obtener el registro completo y lo guardamos

            getData(urlUsuarios, 'GET').then(function (resultObj) {
                if (resultObj.status === "ok") {
                    usuarios = resultObj.data
                }
                //Removemos la alerta (en caso de que esté activa) y limpiamos la consola (en caso tenga contenido)
                alertError.classList.remove("show")
                blackConsole.innerHTML = ""

                //Recorremos array y mostramos los usuarios en la consola a través de showConsole()
                for (let i = 0; i < usuarios.length; i++) {
                    let users = usuarios[i];
                    let { id, name, lastname } = users

                    showConsole(id, name, lastname)
                }
                inputModificar.value = "";
            })
        };
    })

});

//Código para establecer funcionalidad al dar click en el botón borrar
btnEliminar.addEventListener("click", () => {
    if (inputEliminar.value) {
        //si hay un valor ingresado, el metodo delete lo borra de la lista
        getData(urlUsuarios + "/" + inputEliminar.value, 'DELETE').then(function (resultObj) {
            if (resultObj.status === "ok") {
                usuarios = resultObj.data
            }
            alertError.classList.remove("show")
            blackConsole.innerHTML = ""
            for (let i = 0; i < usuarios.length; i++) {
                let users = usuarios[i];
                let { id, name, lastname } = users

                showConsole(id, name, lastname)
            }
        })
    }
})

