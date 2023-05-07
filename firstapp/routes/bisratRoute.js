const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Poem = require('../models/poem');
const User = require('../models/User');
require('dotenv').config();
// const openai = require('openai');
const GPT = require('openai-api');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const gpt = new GPT(OPENAI_API_KEY);

const get_response = async (prompt) => {
    const completePrompt = `Write a poem about this topic, have a catchy title at the beginning: ${prompt} `;
    const response = await gpt.complete({
        engine: 'text-davinci-003',
        prompt: completePrompt,
        maxTokens: 100,
        temperature: 0.9,
      });
      return response.data.choices[0].text;

};

router.get('/poem',
    isLoggedIn,
    async(req, res, next) => {
        res.render('poem');
    });

router.post('/poem',
    isLoggedIn,
    async(req, res, next) => {
        const topic = req.body.poem;
        const poem = await get_response(topic);
        const newPoem = new Poem({
            title: topic,
            content: poem,
            dateGenerated: Date.now(),
        });
        newPoem.save();
        res.render('poemResult', { poem: poem });
    }
);


module.exports = router;


