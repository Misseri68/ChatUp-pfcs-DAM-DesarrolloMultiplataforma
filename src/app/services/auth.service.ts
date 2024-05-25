import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth)   //devuelve un observable que emite el estado de autenticación del usuario

  constructor(private auth: Auth) {}

  loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())); //inicia sesión con Google utilizando un popup
  }

  logout() {
    return from(signOut(this.auth));
  }
}
