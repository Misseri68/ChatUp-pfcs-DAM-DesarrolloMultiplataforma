import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthComponent} from "./auth/auth/auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent],
  template: `

    <router-outlet></router-outlet>
  `,



  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Chat-Up';
  loggedIn:boolean = false;

  public setLoggedIn(loggedValue : boolean){
    this.loggedIn = loggedValue;
  }
}
