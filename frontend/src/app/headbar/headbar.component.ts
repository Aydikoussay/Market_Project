import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css']
})
export class HeadbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

 

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
  }
}