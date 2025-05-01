export const getBotpressSession = () => {
    const userKey = localStorage.getItem('xUserKey');
    const conversationId = localStorage.getItem('conversationId');
    const webhookId = localStorage.getItem('webhookId');
    return userKey && conversationId && webhookId
      ? { userKey, conversationId, webhookId }
      : null;
  };
  
  export const saveBotpressSession = ({ userKey, conversationId, webhookId }) => {
    localStorage.setItem('xUserKey', userKey);
    localStorage.setItem('conversationId', conversationId);
    localStorage.setItem('webhookId', webhookId);
  };
  