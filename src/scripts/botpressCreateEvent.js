// File: src/scripts/botpressEventsService.js
const axios = require('axios');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const WEBHOOK_ID = '5fa42c48-fe97-43a5-9a5d-f1581220dffe';
const BASE_URL = `https://chat.botpress.cloud/${WEBHOOK_ID}`;
const SESSION_PATH = path.resolve('.botpressSession.json');
const USER_KEYS_PATH = path.resolve('data/user/keys.json');

// Helper functions
function saveSession({ userKey, conversationId, webhookId }) {
  fs.writeFileSync(
    SESSION_PATH,
    JSON.stringify({ userKey, conversationId, webhookId }, null, 2)
  );
}

function loadSession() {
  if (!fs.existsSync(SESSION_PATH)) {
    throw new Error('Session file not found. Please initialize connection first.');
  }
  return JSON.parse(fs.readFileSync(SESSION_PATH, 'utf-8'));
}

function saveUserKeys(userKey, conversationId) {
  const dir = path.dirname(USER_KEYS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(USER_KEYS_PATH, JSON.stringify({ xUserKey: userKey, conversationId }, null, 2));
}

// Core Botpress Service
class BotpressService {
  constructor() {
    this.initialized = false;
    this.userKey = null;
    this.conversationId = null;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Check if we have existing session
      const session = loadSession();
      this.userKey = session.userKey;
      this.conversationId = session.conversationId;
      this.initialized = true;
      return;
    } catch (e) {
      console.log('No existing session found, creating new connection...');
    }

    try {
      // Create new user
      const createUserRes = await axios.post(`${BASE_URL}/users`, {}, { 
        headers: { 'Content-Type': 'application/json' } 
      });
      this.userKey = createUserRes.data.key;

      // Create conversation
      this.conversationId = randomUUID();
      await axios.post(
        `${BASE_URL}/conversations/get-or-create`,
        { id: this.conversationId },
        { headers: { 'Content-Type': 'application/json', 'x-user-key': this.userKey } }
      );

      // Save session
      saveSession({ 
        userKey: this.userKey, 
        conversationId: this.conversationId, 
        webhookId: WEBHOOK_ID 
      });
      saveUserKeys(this.userKey, this.conversationId);

      this.initialized = true;
    } catch (error) {
      console.error('Botpress initialization failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async createEvent(payload) {
    if (!this.initialized) await this.initialize();

    try {
      const res = await axios.post(
        `${BASE_URL}/events`,
        { conversationId: this.conversationId, payload },
        { headers: { 'Content-Type': 'application/json', 'x-user-key': this.userKey } }
      );
      return res.data;
    } catch (error) {
      console.error('Event creation failed:', error.response?.data || error.message);
      throw error;
    }
  }
}

// Singleton instance
const botpressService = new BotpressService();

// Export the BotpressService instance for use in other parts of your app
module.exports = botpressService;
