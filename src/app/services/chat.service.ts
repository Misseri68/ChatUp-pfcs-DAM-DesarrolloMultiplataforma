import {Injectable} from "@angular/core";
import {
  addDoc,
  collection, collectionData,
  CollectionReference, deleteDoc,
  doc, docData,
  DocumentData,
  Firestore, getDoc, getDocs, limit, orderBy, query,
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
  getChatByIdEager(chatId: string): Observable<Chat> {
    const chatDoc = doc(this.firestore, `chats/${chatId}`);
    return from(getDoc(chatDoc)).pipe(
      map(docSnap => {
          return docSnap.data() as Chat;
      })
    );
  }

  /*Aquí el método lo llamo Lazy porque cargar todos los mensajes de cada chat al iniciar la aplicación significaría una sobrecarga.
  * Por tanto, cargo todos los datos menos los mensajes, haciendo una consulta para cargar sólo el último.*/
  getChatsLazy(username: string): Observable<Chat[]> {
    const chatsCollection = collection(this.firestore, 'chats');
    const chatQuery = query(chatsCollection, where('participants', 'array-contains', username));
    return from(getDocs(chatQuery)).pipe(
      map(snapshot => {
        const chats = snapshot.docs.map(doc => {
          const data = doc.data() as Partial<Chat>;
          const id_chat = doc.id;
          return {
            id_chat: id_chat,
            chatName: data.chatName,
            photo: data.photo,
            isDM: data.isDM,
            participants: data.participants,
            unreadMessages: data.unreadMessages
          } as Chat;
        });
        return chats;
      }),
      switchMap(chats => {
        const chatObservables = chats.map(chat => this.getLastMessage(chat));
        return combineLatest(chatObservables).pipe(
          map(chatsWithLastMessage => {
            // Ordenar los chats por el timestamp del último mensaje
            return chatsWithLastMessage.sort((a, b) => {
              const timestampA = a.lastMessage ? new Date(a.lastMessage.date).getTime() : 0;
              const timestampB = b.lastMessage ? new Date(b.lastMessage.date).getTime() : 0;
              return timestampB - timestampA;
            });
          })
        );
      })
    );
  }

  // Obtener el último mensaje del chat
  private getLastMessage(chat: Chat): Observable<Chat> {
    const messagesCollection = collection(this.firestore, `chats/${chat.id_chat}/messages`);
    const lastMessageQuery = query(messagesCollection, orderBy('date', 'desc'), limit(1));

    return from(getDocs(lastMessageQuery)).pipe(
      map(snapshot => {
        if (snapshot.empty) {
          return chat;
        }
        const lastMessage = snapshot.docs[0].data() as Message;
        return { ...chat, lastMessage };
      })
    );
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


/*
  createChat(chat: Partial<Chat>): Promise<Chat | null> {
    return addDoc(this.chatsCollection, chat).then(docRef => {
      return getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          const newChat = docSnap.data() as Chat;
          newChat.id_chat = docSnap.id;
          return newChat;
        } else {
          return null;
        }
      });
    }).catch(error => {
      console.error("Error creating chat:", error);
      return null;
    });
  }
  */
