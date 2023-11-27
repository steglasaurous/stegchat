import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { HomeComponent } from './components/home/home.component';
import { MessageHtmlPipe } from './pipes/message-html.pipe';
import {TwitchChatService} from "./services/twitch-chat.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    HomeComponent,
    MessageHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TwitchChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
