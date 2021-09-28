const socket = io()

document.querySelector('#form').addEventListener('submit',(e) =>{
  e.preventDefault()
  socket.emit('sendMessage',document.getElementById('fname').value)
})

socket.on('greeting', (greeting) => {
  console.log(greeting)
})