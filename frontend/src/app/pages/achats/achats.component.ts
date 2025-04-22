import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-achats',
  templateUrl: './achats.component.html',
  styleUrls: ['./achats.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]

})
export class AchatsComponent {
  cigarettes = ['Marlboro', 'Camel', 'Winston', 'Lucky Strike'];
  produitsAlimentaires = ['Chocolat', 'Biscuits', 'Chips', 'Bonbons'];
  fruitsSecs = ['Amandes', 'Noix', 'Raisins secs', 'Abricots secs'];
  autresProduits = ['Eau', 'Soda', 'Café', 'Thé'];
  
  selectedCigarette: string = '';
  selectedProduit: string = '';
  selectedFruit: string = '';
  selectedAutre: string = '';
  quantiteCigarettes: number = 0;
  quantiteProduits: number = 0;
  quantiteFruits: number = 0;
  quantiteAutres: number = 0;
  newItem: string = '';

  addNewItem(category: string) {
    if (this.newItem.trim()) {
      if (category === 'cigarettes') {
        this.cigarettes.push(this.newItem);
        this.selectedCigarette = this.newItem;
      } else if (category === 'produits') {
        this.produitsAlimentaires.push(this.newItem);
        this.selectedProduit = this.newItem;
      } else if (category === 'fruits') {
        this.fruitsSecs.push(this.newItem);
        this.selectedFruit = this.newItem;
      } else if (category === 'autres') {
        this.autresProduits.push(this.newItem);
        this.selectedAutre = this.newItem;
      }
      this.newItem = '';
    }
  }

  validerAchat(category: string) {
    console.log(`Achat validé pour ${category}`);
  }
  cardsLoaded = false;
  ngOnInit() {
    setTimeout(() => {
      this.cardsLoaded = true;
    }, 100);
  }
}
