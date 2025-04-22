import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn'); // Vérifie si l'utilisateur est connecté
    if (isLoggedIn) {
      return true; // Autorise l'accès
    } else {
      this.router.navigate(['/login']); // Redirige vers la page de connexion
      return false; // Bloque l'accès
    }
  }
}