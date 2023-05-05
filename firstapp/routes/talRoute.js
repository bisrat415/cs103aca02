/*
  talRoute.js - route for my ChatGPT Prompt Engineering
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = require('../models/story');
const User = require('../models/User');


isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}

router.get('/tal', isLoggedIn, (req, res) => {
  res.render('tal');
});

router.post('/story', isLoggedIn, async (req, res) => {
  const topic = req.body.topic;
  const story = await chatgpt.generateStory(topic);

  // Save the generated story to the database
  const newStory = new Story({
    topic,
    story,
  });
  await newStory.save();

  res.render('story', { story });
});

module.exports = router;