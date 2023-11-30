import { Injectable } from '@angular/core';
import {buildEmoteImageUrl, ChatClient, parseChatMessage} from "@twurple/chat";
import {Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {ChatMessageModel} from "../chat-message.model";
import {ChatMessage} from "../models/chat-message";



@Injectable({
  providedIn: 'root'
})
export class TwitchChatService {
  private chatClient!: ChatClient;
  private messagesSubject$ = new Subject<ChatMessage>();
  public messages$ = this.messagesSubject$.pipe(catchError(e => {
    throw e;
  }));

  constructor() {
    // FIXME: Next steps:
    //        - spec out a proper service for this
    //        - channels configurable through querystring
    //        - spec out an architecture for being able to change out different chat display methods
    //        - Create a "pretty" display method - include what channel it came from for multiple channels
    //        - "Step 3: PROFIT"
  }

  connect(channels: string[]) {
    this.chatClient = new ChatClient({ channels: channels});
    this.chatClient.connect();
    this.chatClient.onMessage(  (channel, user, text, msg) => {
      // Takes the incoming text and parses out the emotes. Output is an array of message parts
      // Assembles a renderable message text with emote images
      const renderedMessage = parseChatMessage(text, msg.emoteOffsets).map((messagePart) => {
        switch (messagePart.type) {
          case 'text':
            return messagePart.text;
          case 'emote':
            return `<img src="${buildEmoteImageUrl(messagePart.id, { size: '1.0' })}" />`;
        }

        return '';
      });

      const chatMessageModel: ChatMessage = {
        msgId: msg.id,
        username: msg.userInfo.displayName,
        channel: channel,
        message: text,
        renderedMessage: renderedMessage.join(''),
        // timestamp: msg.date.getMilliseconds(),
        timestamp: Date.now(),
        color: msg.userInfo.color,
      }

      this.messagesSubject$.next(chatMessageModel);
    });
  }
}
