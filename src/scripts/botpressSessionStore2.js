const fs = require('fs');
const path = require('path');
const STORE_PATH = path.resolve('.botpressSession.json');

// Updated saveSession function to include userId
function saveSession({ userKey, conversationId, webhookId, userId }) {
  const sessionData = { userKey, conversationId, webhookId, userId };
  fs.writeFileSync(STORE_PATH, JSON.stringify(sessionData, null, 2));
  console.log(`\n💾 Session saved to ${STORE_PATH}`);
}

// Load session data, including userId
function loadSession() {
  if (!fs.existsSync(STORE_PATH)) {
    throw new Error('Session file not found. Please run the Botpress test script first.');
  }
  const data = fs.readFileSync(STORE_PATH, 'utf-8');
  return JSON.parse(data);
}

module.exports = {
  saveSession,
  loadSession
};
