import { Routes } from '@angular/router';
import {HomeComponent} from "./chat/home/home.component";
import {AuthComponent} from "./auth/auth/auth.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    title: 'login'
  },
  {}
];
