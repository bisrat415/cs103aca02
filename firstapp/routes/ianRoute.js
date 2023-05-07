const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const joke = require('../models/joke');
const User = require('../models/User');
require('dotenv').config();
// const openai = require('openai');
const GPT = require('openai-api');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const gpt = new GPT(OPENAI_API_KEY);

const get_response = async (prompt) => {
    const completePrompt = `Make a joke about this topic: ${prompt} `;
    const response = await gpt.complete({
        engine: 'text-davinci-003',
        prompt: completePrompt,
        maxTokens: 100,
        temperature: 0.9,
      });
      return response.data.choices[0].text;

};

router.get('/joke',
    isLoggedIn,
    async(req, res, next) => {
        res.render('joke');
    });

router.post('/joke',
    isLoggedIn,
    async(req, res, next) => {
        const userInput = req.body.userInput;
        const joke = await get_response(userInput);
        //const joke = require('/joke.ejs');
        const newJoke = new Joke({
            actualUserInput: userInput,
            response: joke,
            dateGenerated: Date.now(),
        });
        newJoke.save();
        res.render('jokeResult', { response: joke});
    }
);


module.exports = router;


