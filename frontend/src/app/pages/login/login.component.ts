import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock, faSignInAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import des icônes
import Swal from 'sweetalert2'; // Import de SweetAlert2

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;

  // Icônes Font Awesome
  faUser = faUser;
  faLock = faLock;
  faEye = faEye; // Icône pour afficher le mot de passe
  faEyeSlash = faEyeSlash; // Icône pour masquer le mot de passe
  faSignInAlt = faSignInAlt; // Icône pour le bouton de connexion

  constructor(private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.username === 'admin' && this.password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true'); // Stocke l'état de connexion

      // Affiche l'alerte SweetAlert2
      Swal.fire({
        title: 'Connexion réussie !',
        text: 'Bienvenue sur le tableau de bord.',
        icon: 'success',
        confirmButtonText: 'OK',
        draggable: true, // Permet de déplacer l'alerte
      }).then(() => {
        this.router.navigate(['/dashboard']); // Redirige vers le dashboard après avoir fermé l'alerte
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mot de passe ou nom d'utilisateur incorrect !",
      });;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; // Inverse l'état de visibilité du mot de passe
  }
}