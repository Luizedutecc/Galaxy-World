function startConversation(professorName) {
    // Mostrar o chatbox e definir o nome do professor
    document.getElementById('chatbox').classList.remove('hidden');
    document.getElementById('chat-name').innerText = professorName;

    // Limpar qualquer entrada anterior de conversa
    const chatContent = document.getElementById('chat-content');
    chatContent.innerHTML = `<p>Olá, sou o ${professorName}. Como posso ajudá-lo com o universo?</p>`;
}

function closeChat() {
    // Fechar o chatbox
    document.getElementById('chatbox').classList.add('hidden');
}

function sendMessage() {
    const chatContent = document.getElementById('chat-content');
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();

    if (message) {
        chatContent.innerHTML += `<p><strong>Você:</strong> ${message}</p>`;

        // Simular uma resposta do professor
        chatContent.innerHTML += `<p><strong>Professor:</strong> Interessante! Vamos explorar mais sobre isso.</p>`;

        // Limpar o campo de entrada
        chatInput.value = '';
    }
}