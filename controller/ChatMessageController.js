// backend/controllers/ChatMessageController.js
const ChatMessage = require('../models/ChatMessage');
const { OpenAI } = require('openai'); // Updated for v4.x

// Configure OpenAI with your API key (store in .env for security)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
});

exports.sendMessage = async (req, res) => {
    try {
        const message = await ChatMessage.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.findAll();
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAIResponse = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Or "gpt-4" if preferred
            messages: [{ role: "user", content: message }],
            max_tokens: 150, // Limit response length
            temperature: 0.7, // Control randomness (0.0 to 1.0)
        });

        const aiResponse = response.choices[0].message.content.trim();
        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ error: "Failed to get AI response" });
    }
};