import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Firestore} from "@angular/fire/firestore";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore:  AngularFirestore) { }

  // Crear usuario
  createUser(user: User): Promise<void> {
    return this.firestore.collection('users').doc(user.username).set(user);
  }

  // Leer usuario
  getUser(username: string): Observable<User | undefined> {
    return this.firestore.collection('users').doc<User>(username).valueChanges();
  }
  getUserByEmail(email: string): Observable<User | undefined> {
    return this.firestore.collection('users').doc<User>(email).valueChanges();
  }

  // Leer todos los usuarios
  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }

  // Actualizar usuario
  updateUser(user: User): Promise<void> {
    return this.firestore.collection('users').doc(user.username).update(user);
  }

  // Borrar usuario
  deleteUser(username: string): Promise<void> {
    return this.firestore.collection('users').doc(username).delete();
  }


  /*getUserByUsername(username: string): User {
    const user = this.USERS.find(user => user.username.toLowerCase() === username.toLowerCase());
    if (!user) {
      throw new Error(`User not found for username: ${username}`);
    }
    return user;
  }*/

  formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, '0'); // Asegura dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }




}
