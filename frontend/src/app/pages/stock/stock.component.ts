import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  origin: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  threshold: number;
  expiration: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
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
export class StockComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  editingProduct: Product | null = null;
  editingIndex: number = -1;
  editingField: string = '';
  searchTerm: string = '';
  showLowStockOnly: boolean = false;

  // Déclaration des ViewChild pour tous les champs
  @ViewChild('nameInput', { static: false }) nameInput!: ElementRef;
  @ViewChild('categoryInput', { static: false }) categoryInput!: ElementRef;
  @ViewChild('brandInput', { static: false }) brandInput!: ElementRef;
  @ViewChild('originInput', { static: false }) originInput!: ElementRef;
  @ViewChild('purchasePriceInput', { static: false }) purchasePriceInput!: ElementRef;
  @ViewChild('sellingPriceInput', { static: false }) sellingPriceInput!: ElementRef;
  @ViewChild('stockInput', { static: false }) stockInput!: ElementRef;
  @ViewChild('thresholdInput', { static: false }) thresholdInput!: ElementRef;
  @ViewChild('expirationInput', { static: false }) expirationInput!: ElementRef;

  ngOnInit() {
    this.filteredProducts = [...this.products];
  }

  filterProducts(): void {
    let filtered = [...this.products];
    
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => 
        (product.name && product.name.toLowerCase().includes(term)) ||
        (product.category && product.category.toLowerCase().includes(term)) ||
        (product.brand && product.brand.toLowerCase().includes(term)) ||
        (product.origin && product.origin.toLowerCase().includes(term)) ||
        (product.id.toString().includes(term))
      );
    }
    
    if (this.showLowStockOnly) {
      filtered = filtered.filter(product => product.stock <= product.threshold);
    }
    
    this.filteredProducts = filtered;
  }

  addProduct(): void {
    const newProduct: Product = {
      id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
      name: 'Nouveau produit',
      category: '',
      brand: '',
      origin: '',
      purchasePrice: 0,
      sellingPrice: 0,
      stock: 0,
      threshold: 10,
      expiration: '',
      isNew: true
    };
    
    this.products = [...this.products, newProduct];
    this.filteredProducts = [...this.products];
    this.startEdit(newProduct, this.products.length - 1, 'name');
    
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

startEdit(product: Product, index: number, field: string): void {
  this.editingProduct = {...product};
  this.editingIndex = index;
  this.editingField = field;
  
  setTimeout(() => {
    const inputElement = this.getInputElement(field);
    if (inputElement && inputElement.nativeElement) {
      inputElement.nativeElement.focus();
      inputElement.nativeElement.select();
      // Force le focus si nécessaire
      setTimeout(() => {
        inputElement.nativeElement.focus();
      }, 10);
    }
  }, 0);
}

  private getInputElement(field: string): ElementRef | null {
    switch(field) {
      case 'name': return this.nameInput;
      case 'category': return this.categoryInput;
      case 'brand': return this.brandInput;
      case 'origin': return this.originInput;
      case 'purchasePrice': return this.purchasePriceInput;
      case 'sellingPrice': return this.sellingPriceInput;
      case 'stock': return this.stockInput;
      case 'threshold': return this.thresholdInput;
      case 'expiration': return this.expirationInput;
      default: return null;
    }
  }

  saveEdit(): void {
    if (this.editingProduct && this.editingIndex >= 0) {
      // Conversion des valeurs numériques
      this.editingProduct.purchasePrice = Number(this.editingProduct.purchasePrice);
      this.editingProduct.sellingPrice = Number(this.editingProduct.sellingPrice);
      this.editingProduct.stock = Number(this.editingProduct.stock);
      this.editingProduct.threshold = Number(this.editingProduct.threshold);
      
      this.products[this.editingIndex] = {...this.editingProduct};
      this.filteredProducts = [...this.products];
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.editingIndex = -1;
    this.editingField = '';
  }

  deleteProduct(product: Product): void {
    this.products = this.products.filter(p => p.id !== product.id);
    this.filteredProducts = this.filteredProducts.filter(p => p.id !== product.id);
    if (this.editingIndex === this.products.findIndex(p => p.id === product.id)) {
      this.cancelEdit();
    }
  }

  isLowStock(product: Product): boolean {
    return product.stock <= product.threshold;
  }
}