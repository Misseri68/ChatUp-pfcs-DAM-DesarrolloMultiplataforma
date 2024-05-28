import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgClass,

  ],
  providers:  [ UserService ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), this.usernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]]
    }, {validator: this.passwordMatchValidator});
  }

  //validación custom de valores válidos
  usernameValidator(control: any) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(control.value) ? null : { invalidUsername: true };
  }

  // Validador para asegurar que las contraseñas coinciden
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const password2 = formGroup.get('password2');
    return password && password2 && password.value === password2.value ? null : { mismatch: true };
  }

  async register() {
    // Lógica de inicio de sesión con email y contraseña
    if (this.registerForm.valid) {
      const {username, email, password} = this.registerForm.value;
      try {
        // Verificar si el usuario ya existe por username
        const usernameExists = await this.userService.checkUserExistsByUsername(username);
        if (usernameExists) {
          await Swal.fire( {
            title: 'Error',
            text: `The username ${username} already exists, please pick another one.`,
            icon: 'warning',
            customClass: 'alert-custom-style'});
          return;
        }
        // Verificar si el usuario ya existe por email
        if (await this.userService.checkUserExistsByEmail(email)) {
          await Swal.fire( {
            title: 'Error',
            text: `The email ${email} is already registered.`,
            icon: 'warning',
            customClass: 'alert-custom-style'});
          return;
        }
        // Crear el nuevo usuario
        await this.userService.createUser({
          username: username,
          chats: [],
          friends: [],
          password: password,
          pendingRequests: [],
          profilePicture: "src/assets/pictures/default_pfp.png",
          status: false,
          userOptions: {
            keepLoggedIn: false,
            lightMode: false
          },
          email: email,
          description: "Hi! This is Chat-Up's default description, you can edit it in profile options."
        });
        await Swal.fire( {
          title: 'User created successfully!',
          text: `User  ${username} created successfully. Log In to start chatting up.`,
          icon: 'success',
          customClass: 'alert-custom-style'});
        await this.router.navigate(['/auth']);

      } catch (error) {
        await Swal.fire( {
          title: 'Error',
          text: `There was an error creating the user. Check the console for more information.`,
          icon: 'error',
          customClass: 'alert-custom-style'}
        );
        console.error("Error creating user:", error);
      }
    }
  }


}
