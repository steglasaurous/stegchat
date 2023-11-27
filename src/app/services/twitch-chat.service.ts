import { Injectable } from '@angular/core';
import {buildEmoteImageUrl, ChatClient, parseChatMessage} from "@twurple/chat";

@Injectable({
  providedIn: 'root'
})
export class TwitchChatService {

  constructor() {
    console.log('connecting to chat');
    // FIXME: Make this configurable (via querystring probably?
    const chatClient = new ChatClient({ channels: ['steglasaurous', 'steg_bot' ]});

    // FIXME: Next steps:
    //        - spec out a proper service for this
    //        - channels configurable through querystring
    //        - spec out an architecture for being able to change out different chat display methods
    //        - Create a "pretty" display method - include what channel it came from for multiple channels
    //        - "Step 3: PROFIT"
    chatClient.connect();
    chatClient.onMessage(  (channel, user, text, msg) => {
      //console.log({ channel: channel, user: user, text: text, msg: msg});
      // Takes the incoming text and parses out the emotes. Output is an array of message parts
      console.log(parseChatMessage(text, msg.emoteOffsets));

      // Assembles a renderable message text with emote images
      const renderedMessage = parseChatMessage(text, msg.emoteOffsets).map((messagePart) => {
        switch (messagePart.type) {
          case 'text':
            return messagePart.text;
          case 'emote':
            return `<img src="${buildEmoteImageUrl(messagePart.name)}" />`;
        }

        return '';
      });

      console.log(renderedMessage.join(''));
    });
  }
}
