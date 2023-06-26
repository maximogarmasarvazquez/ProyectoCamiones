function listarProvincias() {
    fetch('http://localhost:4000/provincias')
        .then(response => response.json())
        .then(data => {
            let provincias = document.getElementById('provincias')

            let html = ''
    
             data.map(provincis => {
                html += `
                    <tr id = "${provincis.id}">
                        <td>${provincis.id}</td>
                        <td class= "nombre">${provincis.nombre}</td>
                        <td>${provincis.codigo}</td>
                        <td>
                             <a type= "button" href="/provincis/update/${provincis.id}" class="btn btn-outline-ligth btn-sm mb-3"><i class="bi bi-pencil-square text-dark"></i></a>
                             <button type= "button" class="btn btn-outline-ligth btn-sm mb-3" onclick= "eliminarProvincia('${provincis.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `

            })

            provincias.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function disableButton (id){
  const button = document.getElementById(id)
  button.className = button.className + "disabled"
  button.setAttribute('disabled','disabled')
  button.innerHTML= '  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'

}

function crearProvincia() {

    disableButton(id = "guardar")

    const url ="http://localhost:4000/provincias/create"
    const nombre = document.getElementById("nombre")
    const codigo = document.getElementById("codigo")
  

    const data = {
        'nombre': nombre.value,
        'codigo': codigo.value
    }

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(response => response.json()).then(data => {
        location.href = "/provincis"
      }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrio un error" + error
      })
}

function editarProvincia(id) {

  disableButton(id = "guardar")

  const provincia_id = getIdFromUrl()
  const url =`http://localhost:4000/provincias/update/${provincia_id}`
  const nombre = document.getElementById("nombre")
  const codigo = document.getElementById("codigo")

  const data = {
      'nombre': nombre.value,
      'codigo': codigo.value
  }

  fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    location.href = "/provincis"
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

function getProvincia() {
 const id = getIdFromUrl()

 const url =`http://localhost:4000/provincias/${id}`


 fetch(url).then(response => {return response.json()}).then(Object => {
     document.getElementById("nombre").value = Object.nombre
     document.getElementById("codigo").value = Object.codigo

     document.getElementById("form").className = ""
     document.getElementById('spinner').className = 'd-none'
    })
}

function eliminarProvincia (id) {
  const item = document.getElementById(id)

  const nombre = item.querySelector(".nombre").innerText
  
    if (confirm(`Desea eliminar "${nombre}"?`))  {
    const url = `http://localhost:4000/provincias/delete/${id}`

    fetch(url, {
        method: 'DELETE'
      }).then(response => response.json()).then(data => {
        location.href = "/provincis"
      }).catch(error => {
        console.log(error);
      })
    }

}