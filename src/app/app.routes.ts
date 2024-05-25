import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthComponent} from "./components/auth/auth.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home'},
  { path: 'auth', component: AuthComponent, title: 'Auth'},
  { path: 'register', component: RegisterComponent, title: 'Register'},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
