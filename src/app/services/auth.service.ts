import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from "../model/user";
import {
  collection,
  CollectionReference,
  doc, docData,
  DocumentData,
  Firestore, getDoc,
  getDocs,
  query,
  where
} from "@angular/fire/firestore";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //BehaviorSubject para mantener, actualizar y emitir el valor actual del Usuario (Reactivo)
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  // Observable de BehaviourSubject para permitir que otros componentes se suscriban al estado del usuario actual y reaccionen a cambios.
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Referencia a la colección 'users' en Firestore (como si fuera una tabla usuarios)
  private usersCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private router: Router) {
    // Inicializa la referencia a la colección 'users'
    this.usersCollection = collection(this.firestore, 'users');
    this.getFromLocalStorage()
  }

  // Método para iniciar sesión con username y password
  async login(username: string, password: string): Promise<boolean> {
    const q = query(this.usersCollection, where('username', '==', username), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    // Si se encuentra un usuario, se actualiza el estado del usuario actual
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const currentUser = userDoc.data() as User
      // Emite el usuario adquirido del documento, casteado a User, emitiéndoselo a todos los suscriptores de su observable correspondiente.
      this.currentUserSubject.next(currentUser);
      localStorage.setItem('username', JSON.stringify({ username: username }));
      return true;
    } else {
      this.currentUserSubject.next(null); // Emitir null si no se encuentra el usuario
      return false;
    }
  }

  async getFromLocalStorage() {
    const storedUsernameJSON = localStorage.getItem("username");
    if (storedUsernameJSON) {
      const storedUsername = JSON.parse(storedUsernameJSON).username;
      const q = query(this.usersCollection, where('username', '==', storedUsername));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const currentUser = userDoc.data() as User
        console.log(querySnapshot)
        // Emite el usuario adquirido del documento, casteado a User, emitiéndoselo a todos los suscriptores de su observable correspondiente.
        this.currentUserSubject.next(currentUser);
        this.router.navigate(['/home']);

      }
    }
  }

  async logout(){
    localStorage.removeItem("username");
    this.router.navigate(['/auth']);
  }


}
