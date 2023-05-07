const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const translate = require('../models/translate');
const User = require('../models/User');
require('dotenv').config();
// const openai = require('openai');
const GPT = require('openai-api');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const gpt = new GPT(OPENAI_API_KEY);

const get_response = async (prompt) => {
    const completePrompt = `Translate the given text into the language inputted by the user, it will
    be of the form "language, text". If there is no language provided,
    translate the text into giberish: ${prompt} `;
    const response = await gpt.complete({
        engine: 'text-davinci-003',
        prompt: completePrompt,
        maxTokens: 100,
        temperature: 0.9,
      });
      return response.data.choices[0].text;

};

router.get('/translate',
    isLoggedIn,
    async(req, res, next) => {
        res.render('translate');
    });

router.post('/translate',
    isLoggedIn,
    async(req, res, next) => {
        const input = req.body.input;
        const translation = await get_response(input);
        const newTranslation = new translate({
            actualInput: input,
            translation: translation,
            dateGenerated: Date.now(),
        });
        newTranslation.save();
        res.render('translateResult', { translation: translation });
    }
);


module.exports = router;


