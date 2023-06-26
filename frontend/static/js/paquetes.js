
function listarPaquetes() {
    fetch('http://localhost:4000/paquetes')
        .then(response => response.json())
        .then(data => {
            let paquetes = document.getElementById('paquetes')
            let html = ''
            let provincia = ''
            let camionero= ''
    
             data.map(paquets => {
              if (paquets.provincia !== null && paquets.provincia !== undefined && paquets.provincia !== {}){
                provincia =`${paquets.provincia.nombre} (${paquets.provincia.codigo})`
              }else{
                provincia = ''
              }
              if (paquets.camionero !== null && paquets.camionero !== undefined && paquets.camionero !== {}){
                camionero =`${paquets.camionero.nombre} (DNI ${paquets.camionero.dni})`
              }else{
                camionero = ''
              }
                html += `
                    <tr id = "${paquets.id}">
                        <td>${paquets.id}</td>
                        <td class= "codigo">${paquets.codigo}</td>
                        <td>${paquets.descripcion}</td>
                        <td>${paquets.destinario}</td>
                        <td>${paquets.direccionDestinario}</td>
                        <td>${provincia}</td>
                        <td>${camionero}</td>
                        <td>
                             <a type= "button" href="/paquets/update/${paquets.id}" class="btn btn-outline-ligth btn-sm mb-3"><i class="bi bi-pencil-square text-dark"></i></a>
                             <button type= "button" class="btn btn-outline-ligth btn-sm mb-3" onclick= "eliminarPaquete('${paquets.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            paquetes.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function disableButton (id){
  const button = document.getElementById(id)
  button.className = button.className + "disabled"
  button.setAttribute('disabled','disabled')
  button.innerHTML= '  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'

}

function crearPaquete() {

    disableButton(id = "guardar")

    const url ="http://localhost:4000/paquetes/create"
    const destinario = document.getElementById("destinario")
    const codigo = document.getElementById("codigo")
    const descripcion = document.getElementById("descripcion")
    const direccionDestinario = document.getElementById("direccionDestinario")
    const provincia = document.getElementById('provincia')
    const camionero = document.getElementById('camionero')

    const data = {
        'destinario': destinario.value,
        'codigo': codigo.value,
        'descripcion': descripcion.value,
        'direccionDestinario': direccionDestinario.value,
        'provinciaId': provincia.value,
        'camioneroId': camionero.value
    }

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(response => response.json()).then(data => {
        location.href = "/paquets"
      }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrio un error" + error
      })
}

function editarPaquete(id) {

  disableButton(id = "guardar")

  const paquete_id = getIdFromUrl()
  const url =`http://localhost:4000/paquetes/update/${paquete_id}`
  const destinario = document.getElementById("destinario")
  const codigo = document.getElementById("codigo")
  const descripcion = document.getElementById("descripcion")
  const direccionDestinario = document.getElementById("direccionDestinario")
  const provincia = document.getElementById('provincia')
  const camionero = document.getElementById('camionero')


  const data = {
      'destinario': destinario.value,
      'codigo': codigo.value,
      'descripcion': descripcion.value,
      'direccionDestinario': direccionDestinario.value,
      'provinciaId': provincia.value,
      'camioneroId': camionero.value


  }

  fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    location.href = "/paquets"
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

function getPaquete() {
 const id = getIdFromUrl()

 const url =`http://localhost:4000/paquetes/${id}`


 fetch(url).then(response => {return response.json()}).then(Object => {
     document.getElementById("codigo").value = Object.codigo
     document.getElementById("destinario").value = Object.destinario
     document.getElementById("descripcion").value = Object.descripcion
     document.getElementById("direccionDestinario").value = Object.direccionDestinario
     loadSelectProv(provincia = Object.provinciaId)
     loadSelectCam(camionero = Object.camioneroId)

     document.getElementById("form").className = ""
     document.getElementById('spinner').className = 'd-none'
    })
}

function eliminarPaquete (id) {
  const item = document.getElementById(id)

  const codigo = item.querySelector(".codigo").innerText
  
    if (confirm(`Desea eliminar el paquete "${codigo}"?`))  {
    const url = `http://localhost:4000/paquetes/delete/${id}`

    fetch(url, {
        method: 'DELETE'
      }).then(response => response.json()).then(data => {
        location.href = "/paquets"
      }).catch(error => {
        console.log(error);
      })
    }

}

function getProvincias(provincias, provincia){
  let url ='http://localhost:4000/provincias'
  fetch(url, {})
  .then(response => response.json())
  .then(data => {
      let html = '<option value ="null">Seleccionar</option>'
      let selected = ''
      data.map(item => {
        if(item.id == provincia){
          selected ='selected'
        }else{
          selected =''
        }

        html += `<option value ="${item.id}" ${selected}>${item.nombre}</option>`
      })
      provincias.innerHTML = html
  });
}

function loadSelectProv(provincia = null){
  const provincias = document.getElementById("provincia")

  getProvincias(provincias, provincia)
  
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
  const camioneros = document.getElementById("camionero")

  getCamioneros(camioneros, camionero)
  
}