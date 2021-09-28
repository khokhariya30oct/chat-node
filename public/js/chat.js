const socket = io()

function increment() {
  socket.emit('increment')
}

socket.on('countUpdated', (counter) => {
  console.log('The count is updated ',counter)
})