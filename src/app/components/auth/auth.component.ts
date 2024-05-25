import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-auth',

  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './auth.component.html' ,
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  login() {
    // Lógica de inicio de sesión con email y contraseña
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Email:', email, 'Password:', password);
    }
  }

  loginGoogle(){
    this.authService.loginWithGoogle().subscribe() //subscribe() se usa para manejar la suscripción al observable devuelto por loginWithGoogle().
  }
}
