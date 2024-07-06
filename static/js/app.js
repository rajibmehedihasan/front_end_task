const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const inputForm = document.getElementById("userInputForm");

function addMessage(sender, message) {
    const messageElement = document.createElement("li");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage("You", message);
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: message }),
        })
            .then((response) => response.json())
            .then((data) => {
                addMessage("Grumpy AI", data.response);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        userInput.value = "";
    }
}

inputForm.addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage();
});

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("userInput");

    textarea.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});
