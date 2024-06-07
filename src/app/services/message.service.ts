import {Injectable} from "@angular/core";
import {
  addDoc,
  collection, collectionData,
  CollectionReference, deleteDoc,
  doc, docData,
  DocumentData,
  Firestore, getDoc, getDocs, limit, onSnapshot, orderBy, query,
  setDoc, updateDoc, where
} from "@angular/fire/firestore";
import {Chat} from "../model/chat";
import {take, tap} from "rxjs";
import {Message} from "../model/message";
import {ChatService} from "./chat.service";

@Injectable({
  providedIn: 'root'
})

export class MessageService{

  constructor(private firestore : Firestore, private chatService: ChatService) {
  }

  addMessageToChat(id_chat: string, message: Message){
    this.chatService.getChatById(id_chat).pipe(
      take(1),
      tap(
        chat => {
          chat.messages.push(message);
          this.chatService.updateChat(id_chat, chat)
        }
      )
    ).subscribe()
  }

 /* formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0'); // Asegura dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } */
}
