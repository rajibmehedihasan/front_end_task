(function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("userInput");
    const inputForm = document.getElementById("userInputForm");

    // Function to add a message to the chatbox
    function addMessage(sender, message) {
        const userIcon =
            sender === "You"
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                </svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
                    <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
                    <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
                </svg>`;

        // Create message element and append to chatbox
        const messageElement = document.createElement("li");
        messageElement.innerHTML = `${userIcon} <span>${message}</span>`;
        chatbox.appendChild(messageElement);

        // Automatically scroll chatbox to bottom
        const chatboxInner = document.querySelector(".chatbox__inner");
        chatboxInner.scrollTop = chatboxInner.scrollHeight;
    }

    // Function to send message and handle response
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            try {
                // Add user message to chatbox
                addMessage("You", message);

                // Send message to server and wait for response
                const response = await fetch("/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: message,
                        assistant_type: ASSISTANT_TYPE,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Network Error!!!");
                }

                const data = await response.json();

                // Add response from server to chatbox
                addMessage("Grumpy AI", data.response);
            } catch (error) {
                console.error("Error:", error);
            }

            // Clear user input
            userInput.value = "";
        }
    }

    // Event listener for submitting user input form
    inputForm.addEventListener("submit", function (e) {
        e.preventDefault();
        sendMessage();
    });

    // Event listener for sending message on 'Enter' key press
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });

    // Automatically adjust textarea height based on input
    document.addEventListener("DOMContentLoaded", function () {
        userInput.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });

    // Select Assistant
    let ASSISTANT_TYPE = document
        .querySelector("[data-assistant][disabled]")
        .getAttribute("data-assistant");
    const aiSwitcher = document.getElementById("aiSwitcher");
    const aiSwitcherText = aiSwitcher.querySelector(".dropdown__btn__text");
    const dropdown =
        aiSwitcher.parentElement.querySelector(".dropdown__options");
    const dropdownButtons = dropdown.querySelectorAll(
        ".dropdown__options button"
    );

    // Event listener for assistant selection dropdown
    aiSwitcher.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

    // Event listeners for assistant selection buttons
    dropdownButtons.forEach((button) => {
        button.addEventListener("click", function () {
            dropdownButtons.forEach((btn) => btn.removeAttribute("disabled"));
            button.setAttribute("disabled", true);
            ASSISTANT_TYPE = button.getAttribute("data-assistant");
            aiSwitcherText.textContent = button.textContent;
            dropdown.classList.remove("show");
        });
    });

    // Close dropdown menu if click is outside of it
    document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });

    // File input preview functionality
    const fileInput = document.getElementById("fileInput");
    const preview = document.getElementById("preview");

    fileInput.addEventListener("change", function (e) {
        const files = e.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function (e) {
                const previewItem = document.createElement("div");
                previewItem.classList.add("preview__item");

                const img = document.createElement("img");
                img.src = e.target.result;
                img.alt = file.name;
                previewItem.appendChild(img);

                const button = document.createElement("button");
                button.textContent = "Remove";
                button.classList.add("remove-btn");
                button.addEventListener("click", function () {
                    preview.removeChild(previewItem);
                });
                previewItem.appendChild(button);

                preview.appendChild(previewItem);
            };

            reader.readAsDataURL(file);
        }
    });
})();
