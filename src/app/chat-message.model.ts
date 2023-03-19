export interface ChatMessageModel {
  username: string;
  displayName: string;
  userId: string;
  subscriber: boolean;

  msgId: string; // identifier from twitch (or youtube?)
  role: number; // 4=Broadcaster 3=Mod 2=VIP 1=Viewer
  color: string; // Hex value of user's chat color
  message: string; // Message content
  isHighlight: boolean;
  bits: number; // If there was a cheer, how many bits it was.
  isReply: boolean; // If it was in reply to another message
  replyTo?: string; // The user the message was in reply to
  firstMessage: boolean; // Whether this was the first message the user sent.
  emotes: EmoteModel[];
  timestamp: number; // timestamp in ms
}

export interface EmoteModel {
  id: string;
  name: string;
  imageUrl: string;
  startIndex: number;
  endIndex: number;
  type: string; // Twitch
}
