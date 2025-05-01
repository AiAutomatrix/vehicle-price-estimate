// File: src/scripts/getLatestBotResponse.js
const axios = require('axios');
const _ = require('lodash');
const { loadSession } = require('./botpressSessionStore2.js');

async function main() {
  try {
    console.log('\n⏳ Waiting for Botpress response...');

    const { userKey, conversationId, webhookId } = loadSession();
    const BASE_URL = `https://chat.botpress.cloud/${webhookId}`;

    const res = await axios.get(
      `${BASE_URL}/conversations/${conversationId}/messages`,
      { headers: { 'x-user-key': userKey } }
    );

    const messages = res.data.messages || [];

    if (messages.length === 0) {
      console.warn('\n⚠️ No messages found.');
      return;
    }

    // Identify your user ID from a known message
    const myUserId = messages.find(m => {
      const payload = _.isString(m.payload) ? JSON.parse(m.payload) : m.payload;
      return payload?.text?.includes('Hello, Botpress!');
    })?.userId;

    if (!myUserId) {
      console.error('\n❌ Could not determine your user ID.');
      return;
    }

    // Get the latest bot response (not from you)
    const botMessage = [...messages].reverse().find(m => m.userId !== myUserId);

    if (!botMessage) {
      console.warn('\n⚠️ No bot message found.');
      return;
    }

    const payload = _.isString(botMessage.payload)
      ? JSON.parse(botMessage.payload)
      : botMessage.payload;

    console.log('\n🤖 Latest bot response:', JSON.stringify(payload, null, 2));
  } catch (err) {
    console.error('\n❌ Error checking bot response:', err.response?.data || err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = main;