import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {from, Observable, take} from "rxjs";
import { Firestore, collection, doc, docData, getDoc, setDoc, updateDoc, deleteDoc, collectionData, query, where, getDocs, CollectionReference, DocumentData } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersCollection: CollectionReference<DocumentData>;


  constructor(private firestore: Firestore) {
    this.usersCollection = collection(this.firestore, 'users');

  }

  // Crear un nuevo usuario
  createUser(user: User): Promise<void> {
    const userDoc = doc(this.firestore, `users/${user.username}`);
    return setDoc(userDoc, user);
  }

  // Leer un usuario por username
  getUserByUsername(username: string): Observable<User> {
    const userDoc = doc(this.firestore, `users/${username}`);
    return docData(userDoc, {idField: 'username'}) as Observable<User>;
  }

  // Verificar si un usuario existe por username
  async checkUserExistsByUsername(username: string): Promise<boolean> {
    const userDoc = doc(this.firestore, `users/${username}`);
    const userSnap = await getDoc(userDoc);
    return userSnap.exists();
  }

  // Verificar si un usuario existe por email
  async checkUserExistsByEmail(email: string): Promise<boolean> {
    const q = query(this.usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Actualizar un usuario
  updateUser(username: string, user: Partial<User>): Promise<void> {
    const userDoc = doc(this.firestore, `users/${username}`);
    return updateDoc(userDoc, user);
  }

  // Borrar un usuario
  deleteUser(username: string): Promise<void> {
    const userDoc = doc(this.firestore, `users/${username}`);
    return deleteDoc(userDoc);
  }

  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0'); // Asegura dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

}
