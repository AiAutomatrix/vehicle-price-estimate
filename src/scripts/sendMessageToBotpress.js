// File: src/scripts/sendMessageToBotpress.js
const axios = require('axios');
const { loadSession } = require('./botpressSessionStore.js');

async function sendMessage(text) {
  try {
    const { userKey, conversationId, webhookId } = loadSession();
    const BASE_URL = `https://chat.botpress.cloud/${webhookId}`;

    const messagePayload = {
      conversationId,
      payload: { type: 'text', text }
    };

    const res = await axios.post(
      `${BASE_URL}/messages`,
      messagePayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-user-key': userKey
        }
      }
    );

    console.log('\n📤 Sent message:', text);
    return res.data;
  } catch (error) {
    console.error('\n❌ Failed to send message:', error.response?.data || error.message);
    throw error;
  }
}

// 🧪 CLI test runner
if (require.main === module) {
  const textToSend = process.argv[2] || 'Hello from sendMessage script!';
  sendMessage(textToSend).catch(() => process.exit(1));
}

module.exports = {
  sendMessage
};