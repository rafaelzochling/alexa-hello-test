const Alexa = require('ask-sdk-core');
const getRickInfo = require('./src/requests/rick');
const getCharacterInfo = require('./src/requests/getCharacterInfo');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the darkest adventure yet!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello Multiverse', speechText)
            .getResponse();
    }
};

const HelloMultiverseIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloMultiverseIntentHandler';
    },
    async handle(handlerInput) {
        const  speechText = await getRickInfo();
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello Multiverse', speechText)
            .getResponse();
    }
};

const CharacterInformationIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'CharacterInformationIntent';
    },
    async handle(handlerInput) {
        handlerInput.attributesManager.getRequestAttributes();
        const { value: characterName } = handlerInput.requestEnvelope.request.intent.slots.characterName;
        const  speechText = await getCharacterInfo(characterName);
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello Multiverse', speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Talk to me Morty! Oh, you\'re not Morty, ok. Ask anything.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello Multiverse', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'So long stranger!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello Multiverse', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log('Code passed on here');
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         HelloMultiverseIntentHandler,
                         CharacterInformationIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler)
     .lambda();
