import { Component ,Input} from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'; // Import des icônes

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  @Input() isDarkMode = false;// État du mode sombre
  faMoon = faMoon; // Icône pour le mode sombre
  faSun = faSun; // Icône pour le mode clair

  
}
