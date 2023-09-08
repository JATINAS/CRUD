ciclo = 0;
let tarea = {titulo:"", descripcion:""};


let titulo = document.getElementById("tarea")
let descripcion = document.getElementById("detalles")
let tareas = localStorage.getItem("tareas")? JSON.parse(localStorage.getItem("tareas")): []
let editando = false
let tareaprevia = ""
localStorage = ""
function registro() {
    if (editando) {
        tareas = tareas.map(tarea => {
            
          if (tarea.titulo === tareaprevia) {
            tarea.titulo = document.getElementById("tarea").value
            tarea.descripcion = document.getElementById("detalles").value
          }
          return tarea 
        })
        editando = false
    }

    else {
        tarea = {titulo:document.getElementById("tarea").value, descripcion:document.getElementById("detalles").value}
        tareas.push(tarea)
    }
    //console.log(document.getElementById("tarea").value)
    //console.log(document.getElementById("detalles").value)
    localStorage.setItem("tareas", JSON.stringify(tareas))
    acualizarlista()

    document.getElementById("tarea").value = ""
    document.getElementById("detalles").value = ""
}

function acualizarlista () {
    tareas = JSON.parse(localStorage.getItem("tareas"))
    console.log(tareas)
    let lista = document.getElementById("lista")
    lista.innerHTML = ""
tareas.forEach(tarea => {
    let li = document.createElement("li")
        li.textContent = tarea.titulo
        li.classList.add("itemli")
        let buttondelete = document.createElement("button")
        buttondelete.textContent = "Eliminar"
        buttondelete.addEventListener ("click", () => eliminar(tarea.titulo))
        let buttonedit = document.createElement("button")
        buttonedit.textContent = "Editar"
        buttonedit.addEventListener ("click", () => editar(tarea.titulo, tarea.descripcion))
        li.appendChild(buttondelete)
        li.appendChild(buttonedit)
        lista.appendChild(li)
});
}

function editar (titulo, descripcion) {
    editando = true
    tareaprevia = titulo
    document.getElementById("detalles").value = descripcion
    document.getElementById("tarea").value = titulo
}

function eliminar (titulo) {
    tareas = tareas.filter (tarea => tarea.titulo !== titulo)
    localStorage.setItem("tareas", JSON.stringify(tareas))
    acualizarlista()
    
}
