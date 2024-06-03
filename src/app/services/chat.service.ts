import {Injectable} from "@angular/core";
import {
  addDoc,
  collection, collectionData,
  CollectionReference, deleteDoc,
  doc, docData,
  DocumentData,
  Firestore, getDoc, getDocs, query,
  setDoc, updateDoc, where
} from "@angular/fire/firestore";
import {Chat} from "../model/chat";
import {catchError, from, map, Observable, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ChatService{
  private chatsCollection: CollectionReference<DocumentData>

  constructor(private firestore: Firestore) {
    this.chatsCollection = collection(this.firestore,'chats');
  }

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

  getAllChats(): Observable<Chat[]> {
    return collectionData(this.chatsCollection) as Observable<Chat[]>;
  }

  getChat(chatId: string): Observable<Chat> {
   const chatDoc = doc(this.chatsCollection, chatId);
   return docData(chatDoc) as Observable<Chat>
  }

  getDmChat(participant1: string, participant2: string): Observable<Chat | null> {
    console.log("Participantes:", participant1, participant2);

    const chatQuery = query(this.chatsCollection, where('isDM', '==', true));
    console.log("Consulta de chat:", chatQuery);

    return from(getDocs(chatQuery)).pipe(
      map(snapshot => {
        if (snapshot.empty) {
          console.log("No se encontraron resultados.");
          return null; // No se encontraron resultados
        }

        console.log("Documentos obtenidos:", snapshot.docs);

        const matchingChats = snapshot.docs.filter(doc => {
          const chatData = doc.data() as Chat;
          const participantsMatch = chatData.participants.length === 2 &&
            chatData.participants.includes(participant1) &&
            chatData.participants.includes(participant2);
          return participantsMatch;
        });

        console.log("Chats coincidentes:", matchingChats);

        if (matchingChats.length > 0) {
          console.log("Chat encontrado:", matchingChats[0].data());
          return matchingChats[0].data() as Chat;
        } else {
          console.log("No se encontró un chat que coincida.");
          return null;
        }
      }),
      catchError(() => {
        console.error("Error al obtener los chats.");
        return of(null); // Manejo de errores
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
