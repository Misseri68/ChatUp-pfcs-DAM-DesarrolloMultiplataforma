export interface Message {
  message_id: string;
  isMedia: boolean;
  media?: string;
  text: string;
  sender: string;
  readBy?: string[];
  date: Date;
}
