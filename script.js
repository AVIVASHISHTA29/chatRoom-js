const socket = io();

const messages = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const usernamePopup = document.getElementById("username-popup");
const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
let username = "";

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!usernameInput.value.trim()) {
    alert("Please enter a username.");
    return;
  }

  username = usernameInput.value;
  usernamePopup.style.display = "none";
  document.querySelector(".chat-container").style.display = "flex";
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!messageInput.value.trim()) {
    alert("Please enter a message.");
    return;
  }

  const data = {
    username: username,
    message: messageInput.value,
  };

  socket.emit("chat message", data);
  addMessage(data, true);
  messageInput.value = "";
});

socket.on("chat message", (data) => {
  if (data.username !== username) {
    addMessage(data, false);
  }
});

function addMessage(data, sent) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (sent) messageElement.classList.add("sent");
  messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
  messages.appendChild(messageElement);

  // Scroll to the bottom
  messages.scrollTop = messages.scrollHeight;
}
