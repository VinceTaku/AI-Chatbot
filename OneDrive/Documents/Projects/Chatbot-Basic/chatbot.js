document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const userInputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const clearButton = document.getElementById("clear-button");

    // Function to call your OpenAI GPT-3 API for cybersecurity responses
    async function generateCybersecurityResponse(userInput) {
        try {
            const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Put Key"
                },
                body: JSON.stringify({
                    prompt: `Cybersecurity question: ${userInput}`,
                    max_tokens: 500,
                }),
            });

            const responseData = await response.json();
            return responseData.choices[0].text.trim();
        } catch (error) {
            console.error("Error generating response:", error);
            return "Error generating response.";
        }
    }

    // Function to add a message to the chat container
    function addMessage(message, isReceived = true) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.classList.add("message", isReceived ? "received" : "sent");
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the bottom
    }

    // Function to handle user input
    async function handleUserInput() {
        const userMessage = userInputField.value.trim();
        if (userMessage !== "") {
            addMessage(`User: ${userMessage}`, false);

            // Call the OpenAI GPT-3 API for a response
            const botResponse = await generateCybersecurityResponse(userMessage);
            addMessage(`ChatBot: ${botResponse}`);

            userInputField.value = ""; // Clear the user input field
        }
    }

    // Event listener for the send button
    sendButton.addEventListener("click", handleUserInput);

    // Event listener for the clear button
    clearButton.addEventListener("click", function () {
        chatContainer.innerHTML = ""; // Clear the chat container
    });
});


