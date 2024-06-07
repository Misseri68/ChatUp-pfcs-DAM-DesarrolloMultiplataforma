import {Timestamp} from "@angular/fire/firestore";

export interface Message {
  isMedia: boolean;
  media?: string;
  text: string;
  sender: string;
  readBy?: string[];
  date: Timestamp;
}
