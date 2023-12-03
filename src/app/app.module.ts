import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { HomeComponent } from './components/home/home.component';
import { MessageHtmlPipe } from './pipes/message-html.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FakeMessageGeneratorService } from './services/fake-message-generator.service';
import { CHAT_READER } from './utils/di-tokens';
import {TwitchChatService} from "./services/twitch-chat.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    HomeComponent,
    MessageHtmlPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [
    {
      provide: CHAT_READER,
      useClass: TwitchChatService,
    },
    // Use the provider below for testing - it will generate fake messages.
    // {
    //   provide: CHAT_READER,
    //   useClass: FakeMessageGeneratorService,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
