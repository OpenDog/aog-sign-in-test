'use strict';

const express = require('express')
const bodyParser = require('body-parser')

const {actionssdk, NewSurface, SignIn} = require('actions-on-google');

const app = actionssdk({debug: true});

app.intent('actions.intent.MAIN', conv => {
    const capability = 'actions.capability.SCREEN_OUTPUT';

    if (conv.surface.capabilities.has(capability)) {
        conv.ask(new SignIn('To know if you are over 21'));
    } else {
        conv.ask(new NewSurface({
            capabilities: capability,
            context: 'To use this skill you need to sign in',
            notification: 'Please sign in!',
        }))
    }
});

app.intent('actions.intent.NEW_SURFACE', (conv, input, newSurface) => {
    if (newSurface.status === 'OK') {
        conv.ask(new SignIn('To know if you are over 21'));
    } else {
        conv.close(`Ok, I understand. You don't want to sign in. Bye`);
    }
});

app.intent('actions.intent.SIGN_IN', (conv, input, signin) => {
    if (signin.status === 'OK') {
        conv.close(`Whoohoo! You have signed in.`);
    } else {
        conv.close(`Bummer! You have not signed in.`);
    }
});

console.log("listening on port 3000...");
express().use(bodyParser.json(), app).listen(3000);

