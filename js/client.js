const socket = io('http://localhost:8000');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageInp1=document.getElementById('messageInp1');
const messageContainer = document.querySelector('.container')

var audio = new Audio('game-bonus-144751.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left' || position=='center'){
        console.log('sound is playing');
        audio.play();
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value + messageInp1.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
    

})

const name = prompt("Enter your name to join WeChat")
socket.emit('new-user-joined', name)
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'center');
})

socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name } left the chat`, 'center');
})

$(document).ready(function() {
    $("#messageInp1").emojioneArea({
        pickerPosition: "top",
        tonesStyle: "bullet",
        
    });
}) 