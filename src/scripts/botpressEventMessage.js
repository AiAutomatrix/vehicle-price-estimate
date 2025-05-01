const axios = require('axios');
const _ = require('lodash');
const { loadSession } = require('./botpressSessionStore2.js');

const [,, command, jsonString] = process.argv;

if (command !== 'create-event') {
  console.error('❌ Invalid command. Usage:\nnode botpressEventsServer.js create-event \'{ "type": "...", "data": {...} }\'');
  process.exit(1);
}

let eventPayload;
try {
  eventPayload = JSON.parse(jsonString);
} catch (err) {
  console.error('❌ Invalid JSON provided for event:', err.message);
  process.exit(1);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendEventAndFetchBotResponse() {
  try {
    const { userKey, conversationId, webhookId } = loadSession();

    if (!userKey || !conversationId || !webhookId) {
      throw new Error('Missing session info: userKey, conversationId, or webhookId');
    }

    const BASE_URL = `https://chat.botpress.cloud/${webhookId}`;

    console.log('\n📨 Sending event to Botpress...');
    const eventResponse = await axios.post(
      `${BASE_URL}/events`,
      {
        type: eventPayload.type,
        data: eventPayload.data,
        conversationId,
        payload: {
          type: 'text',
          text: 'Hello, Botpress! We are calling you in this request.'
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-user-key': userKey
        }
      }
    );

    console.log('\n⏳ Waiting 5 seconds for bot to respond...');
    await delay(15000);

    const res = await axios.get(
      `${BASE_URL}/conversations/${conversationId}/messages`,
      {
        headers: { 'x-user-key': userKey }
      }
    );

    const messages = res.data.messages || [];

    if (messages.length === 0) {
      console.warn('⚠️ No messages found.');
      return;
    }

    const myUserId = messages.find(m => {
      const payload = _.isString(m.payload) ? JSON.parse(m.payload) : m.payload;
      return payload?.type === eventPayload.type;
    })?.userId;

    const botMessage = [...messages].reverse().find(m => m.userId !== myUserId);

    if (!botMessage) {
      console.warn('⚠️ No bot message found.');
      return;
    }

    const botPayload = _.isString(botMessage.payload)
      ? JSON.parse(botMessage.payload)
      : botMessage.payload;

    console.log('\n🤖 Bot responded with:\n', JSON.stringify(botPayload, null, 2));
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message);
    process.exit(1);
  }
}

sendEventAndFetchBotResponse();
