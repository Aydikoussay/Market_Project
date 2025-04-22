import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faTachometerAlt, faShoppingCart, faChartBar, faUsers, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('sidebarToggle', [
      state('collapsed', style({
        width: '60px',
        overflow: 'hidden'
      })),
      state('expanded', style({
        width: '250px',
        overflow: 'visible'
      })),
      transition('collapsed <=> expanded', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class SidebarComponent {
  faDashboard = faTachometerAlt;
  faAchats = faShoppingCart;
  faVentes = faChartBar;
  faFournisseurs = faUsers;
  faStock = faBoxes;
  faChartBar = faChartBar;
  isLoggedIn: boolean = false;
  isSidebarExpanded: boolean = true;
  sidebarState: 'expanded' | 'collapsed' = 'expanded';
  isOpen = true;
  constructor(private router: Router) {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn'); // Vérifie si l'utilisateur est connecté
  }

  onLogin() {
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
  private checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
  }
  onLogout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Supprime aussi le token si vous en utilisez un
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirige vers la page de login
  }


  toggleSidebar(): void {
    this.sidebarState = this.sidebarState === 'expanded' ? 'collapsed' : 'expanded';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
