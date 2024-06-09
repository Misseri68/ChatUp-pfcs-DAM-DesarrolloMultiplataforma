import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {catchError, Observable, take, tap} from "rxjs";
import {User} from "../../../model/user";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../services/user.service";
import Swal from "sweetalert2";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

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

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  private storage;
  imageSrc: File | undefined;
  profilePictureUrl: string | undefined;

  constructor(private userService: UserService, ) {
    this.storage = getStorage();
  }

  ngOnInit(){
    if(this.username){
      this.user$ = this.userService.getUserByUsername(this.username)
    }
  }

  onImageClick(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageSrc = event.target.files[0];
      console.log(this.imageSrc); // Verifica que el archivo se haya seleccionado correctamente
      this.uploadProfilePicture(); // Llama a la función de carga de imagen después de seleccionar el archivo
    }
  }

  uploadProfilePicture() {
    if (!this.username || !this.imageSrc) return;

    const storageRef = ref(this.storage, `usersPfps/${this.username}`);
    uploadBytes(storageRef, this.imageSrc).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        this.profilePictureUrl = downloadURL;
        this.user$?.pipe(
          take(1),
          tap(user => {
            if (user && this.profilePictureUrl) {
              user.profilePicture = this.profilePictureUrl;
              this.userService.updateUser(user.username, user);
            }
          })
        ).subscribe();
      });
    }).catch(error => {
      console.error("Error uploading file:", error);
    });
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

}
