const urlUsuarios = "https://6363a4d637f2167d6f7ed742.mockapi.io/Users";
let btnBuscar = document.getElementById( "btnGet1");
let InputBuscar = document.getElementById("inputGet1Id");
const btnAgregar = document.getElementById("btnPost");
let InputAgregarNombre = document.getElementById("inputPostNombre");
let InputAgregarApellido = document.getElementById("inputPostApellido");
const btnModificar = document.getElementById("btnPut");
let inputModificar = document.getElementById("inputPutId");
const btnEliminar = document.getElementById("btnDelete");
let inputEliminar = document.getElementById("inputDelete"); 
let consola = document.getElementById("results");
let usuarios = []
/* 
function getData(urlFetch, metodo) {
fetch(urlFetch, metodo) 
.then((response) => console.log(response.json())) 
.then((data) => usuarios = (data))
} */

let getData = function(url, metodo){
    let result = {};
    
    return fetch(url, {method: metodo})
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

btnBuscar.addEventListener("click", ()=>{
    if (InputBuscar.value == ""){
    getData(urlUsuarios, 'GET').then(function(resultObj){
        if (resultObj.status === "ok"){
            usuarios = resultObj.data
        }

            for (let i = 0; i < usuarios.length; i++) { 
                let users = usuarios[i]; 
                let {id, name, lastname} = users    
              
            consola.innerHTML += `<li>ID: ${id}</li>
                                <li>NAME: ${name}</li>
                                <li>LASTNAME: ${lastname}</li>
                                <br>`    
                            }
                        })
                    }

})      

