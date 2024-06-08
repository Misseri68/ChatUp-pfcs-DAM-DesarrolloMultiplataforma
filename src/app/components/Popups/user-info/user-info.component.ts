import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {catchError, Observable, take, tap} from "rxjs";
import {User} from "../../../model/user";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-info',
  standalone: true,
    imports: [
        NgForOf,
        AsyncPipe,
        NgIf
    ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{
  @Input() username: string | undefined;
  @Input() sessionUsername: string | undefined;
   user$: Observable<User> | undefined;
  constructor(private userService: UserService) {

  }

  ngOnInit(){
    if(this.username){
      this.user$ = this.userService.getUserByUsername(this.username)
    }
  }




  //Emitir evento de cierre al padre.
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();
  onClose() {
    this.closePopup.emit();
  }

  //Si se presiona escape se sale del popup.
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closePopup.emit();
    }
  }

  editDescription() {
    Swal.fire({
      title: 'Enter a text:',
      input: 'text',
      inputPlaceholder: 'Type something...',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      customClass: 'alert-custom-style',
      preConfirm: (text) => {
        // Se ejecutará cuando el usuario haga clic en 'Submit'
        return text; // Devuelve el texto introducido por el usuario
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newDescription = result.value as string; // Obtiene el texto introducido
        // Ahora puedes hacer algo con el nuevo texto
        if (newDescription) {
          if(newDescription.length> 100){
            Swal.fire({
              title: 'Too long!',
              text: 'Maximum length is 100 characters',
              icon: 'error',
              customClass: 'alert-custom-style'
            });
          }else{
            this.user$?.pipe(
              take(1),
              tap(user => {
                if (user) {
                  user.description = newDescription;
                  try {
                    // Actualiza el usuario
                    this.userService.updateUser(user.username, user);
                    Swal.fire({
                      title: 'Description updated successfully!',
                      icon: 'success',
                      customClass: 'alert-custom-style'
                    });
                  } catch (e) {
                    console.log(e);
                  }
                }
              })
            ).subscribe();
          }}}
    });
  }

  editProfilePicture() {

  }
}
