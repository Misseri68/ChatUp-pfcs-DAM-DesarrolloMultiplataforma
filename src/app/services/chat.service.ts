import {Injectable} from "@angular/core";
import {
  addDoc,
  collection, collectionData,
  CollectionReference, deleteDoc,
  doc, docData,
  DocumentData,
  Firestore,  getDoc, getDocs, limit, onSnapshot, orderBy, query,
  setDoc, updateDoc, where
} from "@angular/fire/firestore";
import {Chat} from "../model/chat";
import {catchError, combineLatest, from, map, Observable, of, switchMap} from "rxjs";
import {Message} from "../model/message";

@Injectable({
  providedIn: 'root'
})

export class ChatService{
  private chatsCollection: CollectionReference<DocumentData>

  constructor(private firestore: Firestore) {
    this.chatsCollection = collection(this.firestore,'chats');
  }

  async createChat(chat: Omit<Chat, 'id_chat'>): Promise<Chat> {
    const docRef = await addDoc(this.chatsCollection, chat);
    const docId = docRef.id;
    const createdChat: Chat = { ...chat, id_chat: docId };
    await setDoc(doc(this.chatsCollection, docId), createdChat);
    return createdChat;
  }

  // Obtener un chat por su ID
  getChatById(chatId: string): Observable<Chat> {
    const chatDoc = doc(this.chatsCollection, chatId);
    return docData(chatDoc) as Observable<Chat>;
  }

  getChats(username: string): Observable<Chat[]> {
    const chatsCollection = collection(this.firestore, 'chats');
    const chatQuery = query(chatsCollection, where('participants', 'array-contains', username));

    // Usar collectionData para obtener los datos de forma reactiva
    return collectionData(chatQuery) as Observable<Chat[]>;
  }


  //Busca entre los chats que sean "privados" , "isDM", y después busca cada participante. Devuelve Null o Chat.
  getDmChat(participant1: string, participant2: string): Observable<Chat | null> {
    const chatQuery = query(this.chatsCollection, where('isDM', '==', true));
    return from(getDocs(chatQuery)).pipe(
      map(snapshot => {
        if (snapshot.empty) {
          console.log("No se encontraron resultados.");
          return null; // No se encontraron resultados
        }

        console.log("Documentos obtenidos: ", snapshot.docs);

        const matchingChats = snapshot.docs.filter(doc => {
          const chatData = doc.data() as Chat;
          const participantsMatch = chatData.participants.length === 2 &&
            chatData.participants.includes(participant1) &&
            chatData.participants.includes(participant2);
          return participantsMatch;
        });
        if (matchingChats.length > 0) {
          console.log("Chat encontrado: ", matchingChats[0].data());
          return matchingChats[0].data() as Chat;
        } else {
          console.log("No se encontró un chat que coincida.");
          return null;
        }
      }),
      catchError(() => {
        console.error("Error al obtener los chats.");
        return of(null);
      })
    );
  }

  updateChat(chatId: string, chat: Partial<Chat>): Promise<void> {
    const chatDoc = doc(this.chatsCollection, chatId);
    return updateDoc(chatDoc, chat);
  }

  // Delete a chat
  deleteChat(chatId: string): Promise<void> {
    const chatDoc = doc(this.chatsCollection, chatId);
    return deleteDoc(chatDoc);
  }

}
