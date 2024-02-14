//Creamos una instancia de socket.io del lado del cliente: 
const socket = io(); 

//Creamos una variable para guardar el usuario: 
let user; 
const chatBox = document.getElementById("chatBox");

//Sweet Alert 2: es una librería que nos permite crear alertas personalizadas. 

//Swal es un objeto global que nos permite usar los métodos de la libreria.  

//Fire es un método que nos permite configurar el alerta.

Swal.fire({
    title: "Identificarse", 
    input: "text",
    text: "Ingrese un usuario para identificarse en el chat", 
    inputValidator: (value) => {
        return !value && "Es necesario escribir un nombre para continuar"
    }, 
    allowOutsideClick: false,
}).then( result => {
    user = result.value;
})


chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            //trim nos permite sacar los espacios en blanco del principio y del final de un string. 
            //Si el mensaje tiene más de 0 caracteres, lo enviamos al servidor. 
            socket.emit("message", {user: user, message: chatBox.value}); 
            chatBox.value = "";
        }
    }
})