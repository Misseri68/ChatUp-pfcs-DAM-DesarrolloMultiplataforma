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
    const userDoc = doc(this.usersCollection, user.username);
    return setDoc(userDoc, user);
  }

  // Leer un usuario por username
  getUserByUsername(username: string): Observable<User> {
    const userDoc = doc(this.usersCollection, username);
    return docData(userDoc) as Observable<User>;
  }

  getAllUsers(): Observable<User[]> {
    return collectionData(this.usersCollection) as Observable<User[]>;
  }

  // Verificar si un usuario existe por username
  async checkUserExistsByUsername(username: string): Promise<boolean> {
    const userDoc = doc(this.usersCollection, username);
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
    const userDoc = doc(this.usersCollection, username);
    return updateDoc(userDoc, user);
  }

  // Borrar un usuario
  deleteUser(username: string): Promise<void> {
    const userDoc = doc(this.usersCollection, username);
    return deleteDoc(userDoc);
  }



}
