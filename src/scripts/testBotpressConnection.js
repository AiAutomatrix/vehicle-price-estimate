// File: src/scripts/testBotpressConnection.js
const axios = require('axios');
const _ = require('lodash');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');
const { saveSession } = require('./botpressSessionStore2.js');

// Replace with your actual Webhook ID
const WEBHOOK_ID = '5fa42c48-fe97-43a5-9a5d-f1581220dffe';
const BASE_URL = `https://chat.botpress.cloud/${WEBHOOK_ID}`;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function saveKeysToFile(userKey, conversationId) {
  const dir = path.resolve('data/user');
  const filePath = path.join(dir, 'keys.json');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const payload = {
    xUserKey: userKey,
    conversationId
  };

  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
  console.log(`\n💾 Saved keys to ${filePath}`);
}

async function main() {
  try {
    console.log('\n🚀 Starting Botpress Chat API connectivity test...');

    const hello = await axios.get(`${BASE_URL}/hello`);
    console.log('\n✅ Chat API reachable:', hello.data);

    const createUserRes = await axios.post(
      `${BASE_URL}/users`,
      {},
      { headers: { 'Content-Type': 'application/json' } }
    );
    const userKey = createUserRes.data.key;
    console.log('\n🆕 User key received:', userKey);

    const conversationId = randomUUID();
    await axios.post(
      `${BASE_URL}/conversations/get-or-create`,
      { id: conversationId },
      { headers: { 'Content-Type': 'application/json', 'x-user-key': userKey } }
    );
    console.log('\n🧵 Conversation ID:', conversationId);

    saveKeysToFile(userKey, conversationId);
    saveSession({ userKey, conversationId, webhookId: WEBHOOK_ID });

    const messagePayload = {
      conversationId,
      payload: { type: 'text', text: 'Hello, Botpress! We are calling you in this request.' }
    };
    const sendMsgRes = await axios.post(
      `${BASE_URL}/messages`,
      messagePayload,
      {
        headers: { 'Content-Type': 'application/json', 'x-user-key': userKey }
      }
    );
    console.log('\n📤 Sent message response:', sendMsgRes.data);

    console.log('\n⏳ Waiting for Botpress to respond...');
    await delay(25000); // Use a 5 second delay to get the bot response

    const listRes = await axios.get(
      `${BASE_URL}/conversations/${conversationId}/messages`,
      {
        headers: { 'x-user-key': userKey }
      }
    );
    console.log('\n📥 Conversation messages:', listRes.data);

    if (listRes.data.messages && listRes.data.messages.length > 0) {
      const firstMessagePayload = listRes.data.messages[0].payload;

      const payload = _.isString(firstMessagePayload)
        ? JSON.parse(firstMessagePayload)
        : firstMessagePayload;

      console.log('\n📦 First message payload:', JSON.stringify(payload, null, 2));
    }

  } catch (error) {
    console.error('\n❌ Error during Botpress Chat API test:', error.response?.data || error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().then(() => process.exit(0));
}

module.exports = main;
