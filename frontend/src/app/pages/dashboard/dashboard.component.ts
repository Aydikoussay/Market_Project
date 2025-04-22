import { Component, OnInit ,Input} from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  profileimage: string = 'assets/shop.png';
  @Input() isDarkMode: boolean = false;

  // Icônes Font Awesome
  faFacebook = faFacebook;
  faInstagram = faInstagram;

  // Message de salutation
  greetingMessage: string = '';

  ngOnInit(): void {
    this.setGreetingMessage();
  }

  setGreetingMessage(): void {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
      this.greetingMessage = 'Bonsoir';
    } else {
      this.greetingMessage = 'Bonjour';
    }
  }
}