import { Pipe, PipeTransform } from '@angular/core';
import {ChatMessageModel} from "../chat-message.model";

@Pipe({
  name: 'messageHtml'
})
export class MessageHtmlPipe implements PipeTransform {

  transform(value: ChatMessageModel, ...args: unknown[]): string {
    let outputMessage: string = value.message;

    for (let emote of value.emotes) {
      outputMessage = outputMessage.replace(emote.name, `<img src="${emote.imageUrl}" width="28" />`);
    }

    return outputMessage;
  }
}
