const webhookUrl = "https://farhanayasmeen.app.n8n.cloud/webhook/tourist-guide";

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();

  if (!message) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  // Clear input
  input.value = "";

  // Add loading bubble
  const loadingMsg = document.createElement("div");
  loadingMsg.classList.add("message", "bot");
  loadingMsg.textContent = "⏳ Loading...";
  chatBox.appendChild(loadingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput: message })
    });

    const data = await response.json();
    loadingMsg.remove();

    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = data.output || "Sorry, no response.";
    chatBox.appendChild(botMsg);
  } catch (error) {
    loadingMsg.remove();

    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = "⚠️ Error connecting to the server.";
    chatBox.appendChild(botMsg);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
