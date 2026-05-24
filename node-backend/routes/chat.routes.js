const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { authMiddleware } = require('../controllers/auth.controller');

// router.use(authMiddleware);

// AI Response endpoints
router.post('/generate', chatController.generateResponse);
router.post('/stream', chatController.streamResponse);
router.get('/health', chatController.healthCheck);

// Conversation management
router.post('/conversations', chatController.createConversation);
router.get('/conversations', chatController.getConversations);
router.get('/conversations/:id', chatController.getConversation);
router.post('/conversations/:id/messages', chatController.sendMessage);
router.put('/conversations/:id', chatController.renameConversation);
router.delete('/conversations/:id', chatController.deleteConversation);

module.exports = router;
