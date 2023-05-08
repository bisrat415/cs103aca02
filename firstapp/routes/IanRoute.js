const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joke = require('../models/Joke');
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
        const userInput = req.body.joke;
        console.log(userInput);
        const joke = await get_response(userInput);
        const newJoke = new Joke({
            actualUserInput: userInput,
            joke: joke,
            dateGenerated: Date.now(),
        });
        newJoke.save();
        res.render('jokeResult', { joke: joke});
    }
);


module.exports = router;



