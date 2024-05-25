import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), this.usernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  //validación custom de valores válidos
  usernameValidator(control: any) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(control.value) ? null : { invalidUsername: true };
  }


  register() {
    // Lógica de inicio de sesión con email y contraseña
    if (this.registerForm.valid) {
      const { username, email, password} = this.registerForm.value;
      if(this.userService.getUser(username)){
        alert("The username is already picked, choose another one.")
      }
      else if(this.userService.getUserByEmail(email)){
        alert("There's already an user with this email.")
      }
      else{
        this.userService.createUser({
            username: username,
            chats: [],
            friends: [],
            password: password,
            pendingRequests: [],
            profilePicture: "src/assets/pictures/default_pfp.png",
            status: false,
            userOptions: undefined,
            email: email,
            description: "Hi! This is Chat-Up's default description, you can edit it with in profile options."
          }
         )
      }
    }
  }


}
