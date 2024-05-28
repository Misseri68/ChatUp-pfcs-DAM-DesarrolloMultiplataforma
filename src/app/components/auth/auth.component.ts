import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  async login() {
    // Lógica de inicio de sesión con email y contraseña
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;

      try {
        const user = await this.authService.login(username, password);
        if (user) {
          await Swal.fire( {
            title: 'Logged in successfully!',
            text: `You'll be redirected to Home now...`,
            icon: 'success',
            customClass: 'alert-custom-style'});
          await this.router.navigate(['/home']);
        } else {
          await Swal.fire( {
            title: 'Error',
            text: `The credentials don't appear to match to any user.`,
            icon: 'error',
            customClass: 'alert-custom-style'}
          );
        }
      } catch (error) {
        await Swal.fire( {
          title: 'There was an error with your User.',
          text: `${error}`,
          icon: 'error',
          customClass: 'alert-custom-style'}
        );
      }
    }
  }

}
