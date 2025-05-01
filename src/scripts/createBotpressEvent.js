// File: src/scripts/createBotpressEvent.js
const axios        = require('axios');
const path         = require('path');
const { loadSession } = require('./botpressSessionStore2.js');

// ───────────────────────────────────────── load session / config
let { userKey: xUserKey, conversationId, webhookId } = (() => {
  try {
    return loadSession();            // { userKey, conversationId, webhookId }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();

const BASE_URL = `https://chat.botpress.cloud/${webhookId}`;

/**
 * Send a custom event to Botpress.
 * @param {object} payload – Any JSON‑serialisable object to place in `payload`.
 * @returns {Promise<object>} The Botpress API response body (event).
 */
async function createEvent(payload) {
  const body = { conversationId, payload };

  const res = await axios.post(
    `${BASE_URL}/events`,
    body,
    { headers: { 'Content-Type': 'application/json', 'x-user-key': xUserKey } }
  );

  return res.data;
}

// ───────────────────────────────────────── CLI helper
// Run:  node src/scripts/createBotpressEvent.js '{"type":"ping","text":"Hello"}'
if (require.main === module) {
  (async () => {
    try {
      const arg = process.argv[2];
      if (!arg) {
        console.error('Usage: node createBotpressEvent.js <jsonPayload>');
        process.exit(1);
      }
      const payload = JSON.parse(arg);
      const event   = await createEvent(payload);
      console.log('\n✅ Event created:', event);
    } catch (err) {
      console.error('\n❌ Failed to create event:', err.response?.data || err.message);
      process.exit(1);
    }
  })();
} else {
  module.exports = { createEvent };
}
