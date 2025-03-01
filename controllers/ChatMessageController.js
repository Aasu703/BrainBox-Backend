const db = require("../backend/db"); // Import db object for ChatMessage model

// Use dynamic import for OpenAI (ESM)
let openai;
import('openai').then(module => {
    openai = new module.OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
    });
}).catch(err => {
    console.error('Failed to load OpenAI:', err);
    throw err;
});

exports.sendMessage = async (req, res) => {
    try {
        const message = await db.ChatMessage.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await db.ChatMessage.findAll();
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAIResponse = async (req, res) => {
    try {
        if (!openai) {
            throw new Error("OpenAI not initialized");
        }
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