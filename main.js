'use strict';

const express = require('express')
const bodyParser = require('body-parser')

const {actionssdk} = require('actions-on-google');

const app = actionssdk({debug: false});

app.intent('actions.intent.MAIN', conv => {
    conv.ask("Zeds dead. What can I do for you?");
});

app.intent('actions.intent.TEXT', conv => {
    conv.close("Bottoms up!");
});

console.log("listening on port 3000...");
express().use(bodyParser.json(), app).listen(3000);

