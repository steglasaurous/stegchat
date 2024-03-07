export interface ChatMessage {
  channel: string;
  username: string;
  message: string;
  renderedMessage: string;
  timestamp: number;
  msgId: string;
  color: string | undefined;
  isAction?: boolean;
}
