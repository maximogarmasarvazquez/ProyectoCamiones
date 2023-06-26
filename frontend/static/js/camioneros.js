
function listarCamioneros() {
    fetch('http://localhost:4000/camioneros')
        .then(response => response.json())
        .then(data => {
            let camioneros = document.getElementById('camioneros')
            
  
            let html = ''
             data.map(camioners => {
              
             
                html += `
                    <tr id = "${camioners.id}">
                        <td>${camioners.id}</td>
                        <td class= "nombre">${camioners.nombre}</td>
                        <td>${camioners.dni}</td>
                        <td>${camioners.telefono}</td>
                        <td>${camioners.direccion}</td>
                        <td>${camioners.salario}</td>
                        <td>${camioners.poblacion}</td>
                        <td>
                             <a type= "button" href="/camioners/update/${camioners.id}" class="btn btn-outline-ligth btn-sm mb-3"><i class="bi bi-pencil-square text-dark"></i></a>
                             <button type= "button" class="btn btn-outline-ligth btn-sm mb-3" onclick= "eliminarCamionero('${camioners.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            camioneros.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function disableButton (id){
  const button = document.getElementById(id)
  button.className = button.className + "disabled"
  button.setAttribute('disabled','disabled')
  button.innerHTML= '  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'

}

function crearCamionero() {

    disableButton(id = "guardar")

    const url ="http://localhost:4000/camioneros/create"
    const nombre = document.getElementById("nombre")
    const dni = document.getElementById("dni")
    const telefono = document.getElementById("telefono")
    const direccion = document.getElementById("direccion")
    const salario = document.getElementById("salario")
    const poblacion = document.getElementById("poblacion")

    const data = {
        'nombre': nombre.value,
        'dni': dni.value,
        'telefono': telefono.value,
        'direccion': direccion.value,
        'salario': salario.value,
        'poblacion': poblacion.value,
    }

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(response => response.json()).then(data => {
        location.href = "/camioners"
      }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrio un error" + error
      })
}

function editarCamionero(id) {

  disableButton(id = "guardar")

  const camionero_id = getIdFromUrl()
  const url =`http://localhost:4000/camioneros/update/${camionero_id}`
  const nombre = document.getElementById("nombre")
  const dni = document.getElementById("dni")
  const telefono = document.getElementById("telefono")
  const direccion = document.getElementById("direccion")
  const salario = document.getElementById("salario")
  const poblacion = document.getElementById("poblacion")

  const data = {
        'nombre': nombre.value,
        'dni': dni.value,
        'telefono': telefono.value,
        'direccion': direccion.value,
        'salario': salario.value,
        'poblacion': poblacion.value,
    }

  fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    location.href = "/camioners"
  }).catch(error => {
    console.log(error);
    document.getElementById("error").innerText = "Ocurrio un error" + error
  })


}

function getIdFromUrl(){
 const route = new URL(window.location).pathname
 const pathArray = route.split('/')
 return pathArray.at(-1)//con at -1 vamos al ultimo elemento de un array
}

function getCamionero() {
 const id = getIdFromUrl()

 const url =`http://localhost:4000/camioneros/${id}`


 fetch(url).then(response => {return response.json()}).then(Object => {
     document.getElementById("nombre").value = Object.nombre
     document.getElementById("dni").value = Object.dni
     document.getElementById("telefono").value = Object.telefono
     document.getElementById("direccion").value = Object.direccion
     document.getElementById("salario").value = Object.salario
     document.getElementById("poblacion").value = Object.poblacion

     document.getElementById("form").className = ""
     document.getElementById('spinner').className = 'd-none'
    })
}

function eliminarCamionero (id) {
  const item = document.getElementById(id)

  const nombre = item.querySelector(".nombre").innerText
  
    if (confirm(`Desea eliminar el camionero "${nombre}"?`))  {
    const url = `http://localhost:4000/camioneros/delete/${id}`

    fetch(url, {
        method: 'DELETE'
      }).then(response => response.json()).then(data => {
        location.href = "/camioners"
      }).catch(error => {
        console.log(error);
      })
    }

}



function getCamiones(camiones, camion){
  let url ='http://localhost:4000/camiones'
  fetch(url, {})
  .then(response => response.json())
  .then(data => {
      let html = '<option value ="null">Seleccionar</option>'
      let selected = ''
      data.map(item => {
        if(item.id == camion){
          selected ='selected'
        }else{
          selected =''
        }
        html += `<option value ="${item.id}" ${selected}>${item.matricula}</option>`
      })
      camiones.innerHTML = html
  });
}

function loadSelectCan(camion = null){
  const camiones = document.getElementById("camionModal")

  getCamiones(camiones, camion)
  
}

function getCamioneros(camioneros, camionero){
  let url ='http://localhost:4000/camioneros'
  fetch(url, {})
  .then(response => response.json())
  .then(data => {
      let html = '<option value ="null">Seleccionar</option>'
      let selected = ''
      data.map(item => {
        if(item.id == camionero){
          selected ='selected'
        }else{
          selected =''
        }

        html += `<option value ="${item.id}" ${selected}>${item.nombre}</option>`
      })
      camioneros.innerHTML = html
  });
}

function loadSelectCam(camionero = null){
  const camioneros = document.getElementById("camioneroModal")

  getCamioneros(camioneros, camionero)
  
}