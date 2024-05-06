import { Routes } from '@angular/router';
import {HomeComponent} from "./chat/home/home.component";
import {AuthComponent} from "./auth/auth/auth.component";
import {ChatComponent} from "./chat/chat/chat.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    title: 'auth'
  },
  {path: 'home', component: HomeComponent},
  {path: 'chat', component: ChatComponent}
];
