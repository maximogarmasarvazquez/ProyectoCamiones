
function listarCamiones() {
    fetch('http://localhost:4000/camiones')
        .then(response => response.json())
        .then(data => {
            let camiones = document.getElementById('camiones')

            let html = ''
    
             data.map(camions => {
                html += `
                    <tr id = "${camions.id}">
                        <td>${camions.id}</td>
                        <td class ="matricula">${camions.matricula}</td>
                        <td>${camions.modelo}</td>
                        <td>${camions.tipo}</td>
                        <td>${camions.potencia}</td>
                        <td>
                             <a type= "button" href="/camions/update/${camions.id}" class="btn btn-outline-ligth btn-sm  mb-3"><i class="bi bi-pencil-square text-dark"></i></a>
                             <button type= "button" class="btn btn-outline-ligth btn-sm mb-3" onclick="eliminarCamion('${camions.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            camiones.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function disableButton (id){
  const button = document.getElementById(id)
  button.className = button.className + "disabled"
  button.setAttribute('disabled','disabled')
  button.innerHTML= '  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'

}

function crearCamion() {

    disableButton(id = "guardar")

    const url ="http://localhost:4000/camiones/create"
    const matricula = document.getElementById("matricula")
    const modelo = document.getElementById("modelo")
    const tipo = document.getElementById("tipo")
    const potencia = document.getElementById("potencia")

    const data = {
        'matricula': matricula.value,
        'modelo': modelo.value,
        'tipo': tipo.value,
        'potencia': potencia.value,
    }

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(response => response.json()).then(data => {
        location.href = "/camions"
      }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrio un error" + error
      })
}

function editarCamion(id) {

  disableButton(id = "guardar")

  const camion_id = getIdFromUrl()
  const url =`http://localhost:4000/camiones/update/${camion_id}`
  const matricula = document.getElementById("matricula")
  const modelo = document.getElementById("modelo")
  const tipo = document.getElementById("tipo")
  const potencia = document.getElementById("potencia")

  const data = {
    'matricula': matricula.value,
    'modelo': modelo.value,
    'tipo': tipo.value,
    'potencia': potencia.value,
   }


  fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    location.href = "/camions"
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

function getCamion() {
 const id = getIdFromUrl()

 const url =`http://localhost:4000/camiones/${id}`


 fetch(url).then(response => {return response.json()}).then(Object => {
     document.getElementById("matricula").value = Object.matricula
     document.getElementById("modelo").value = Object.modelo
     document.getElementById("tipo").value = Object.tipo
     document.getElementById("potencia").value = Object.potencia
    

     document.getElementById("form").className = ""
     document.getElementById('spinner').className = 'd-none'
    })
}

function eliminarCamion (id) {
  const item = document.getElementById(id)

   const matricula = item.querySelector(".matricula").innerText
  
    if (confirm(`Desea eliminar el camion matricula "${matricula}"?`))  {
    const url = `http://localhost:4000/camiones/delete/${id}`

    fetch(url, {
        method: 'DELETE'
      }).then(response => response.json()).then(data => {
        location.href = "/camions"
      }).catch(error => {
        console.log(error);
      })
    }

}