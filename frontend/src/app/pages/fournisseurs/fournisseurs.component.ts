import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Fournisseur {
  id: number;
  nom_fournisseur: string;
  contact: string;
  adresse: string;
}

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css'],
  animations: [
    trigger('tableAnimation', [
      transition(':enter, * => *', [
        query('tr', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('50ms', [
            animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', 
            style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class FournisseursComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  filteredFournisseurs: Fournisseur[] = [];
  editingFournisseur: Fournisseur | null = null;
  editingIndex: number = -1;
  editingField: string = '';
  searchTerm: string = '';

  @ViewChild('nomInput') nomInput!: ElementRef;
  @ViewChild('contactInput') contactInput!: ElementRef;
  @ViewChild('adresseInput') adresseInput!: ElementRef;

  ngOnInit() {
    this.filteredFournisseurs = [...this.fournisseurs];
  }

  filterFournisseurs(): void {
    if (!this.searchTerm) {
      this.filteredFournisseurs = [...this.fournisseurs];
    } else {
      this.filteredFournisseurs = this.fournisseurs.filter(f =>
        f.nom_fournisseur.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        f.contact.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        f.adresse.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  addFournisseur(): void {
    const newFournisseur: Fournisseur = {
      id: this.fournisseurs.length > 0 ? Math.max(...this.fournisseurs.map(f => f.id)) + 1 : 1,
      nom_fournisseur: 'Nouveau fournisseur',
      contact: '',
      adresse: ''
    };
    
    this.fournisseurs = [...this.fournisseurs, newFournisseur];
    this.filteredFournisseurs = [...this.fournisseurs];
    this.startEdit(newFournisseur, this.fournisseurs.length - 1, 'nom_fournisseur');
    
    setTimeout(() => {
      const tableContainer = document.querySelector('.table-container');
      if (tableContainer) {
        tableContainer.scrollTo({
          top: tableContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  startEdit(fournisseur: Fournisseur, index: number, field: string): void {
    this.editingFournisseur = {...fournisseur};
    this.editingIndex = index;
    this.editingField = field;
    
    setTimeout(() => {
      switch(field) {
        case 'nom_fournisseur':
          if (this.nomInput) {
            this.nomInput.nativeElement.focus();
            this.nomInput.nativeElement.select();
          }
          break;
        case 'contact':
          if (this.contactInput) {
            this.contactInput.nativeElement.focus();
            this.contactInput.nativeElement.select();
          }
          break;
        case 'adresse':
          if (this.adresseInput) {
            this.adresseInput.nativeElement.focus();
            this.adresseInput.nativeElement.select();
          }
          break;
      }
    }, 0);
  }

  saveEdit(): void {
    if (this.editingFournisseur && this.editingIndex >= 0) {
      this.fournisseurs[this.editingIndex] = {...this.editingFournisseur};
      this.filteredFournisseurs = [...this.fournisseurs];
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingFournisseur = null;
    this.editingIndex = -1;
    this.editingField = '';
  }

  deleteFournisseur(fournisseur: Fournisseur): void {
    this.fournisseurs = this.fournisseurs.filter(f => f.id !== fournisseur.id);
    this.filteredFournisseurs = this.filteredFournisseurs.filter(f => f.id !== fournisseur.id);
    if (this.editingIndex === this.fournisseurs.findIndex(f => f.id === fournisseur.id)) {
      this.cancelEdit();
    }
  }
}