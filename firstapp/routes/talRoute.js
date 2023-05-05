/*
  talRoute.js - route for my ChatGPT Prompt Engineering
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const GPT = require('openai-api');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const gpt = new GPT(OPENAI_API_KEY);
const Story = require('../models/story');
const User = require('../models/User');


isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}

async function generateStory(topic) {
    const prompt = `Once upon a time, there was a ${topic}. The ${topic} had an adventure.`;
    const response = await gpt.complete({
      prompt,
      maxTokens: 100,
      n: 1,
      stop: '\n',
    });
    return response.data.choices[0].text.trim();
}


router.get('/tal', isLoggedIn, (req, res) => {
  res.render('tal');
});

router.post('/story', isLoggedIn, async (req, res) => {
  const topic = req.body.topic;
  const story = await generateStory(topic);

  // Save the generated story to the database
  const newStory = new Story({
    topic,
    story,
  });
  await newStory.save();

  res.render('story', { story });
});

module.exports = router;