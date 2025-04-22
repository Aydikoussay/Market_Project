import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Ajout de l'import manquant
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FournisseursComponent } from './pages/fournisseurs/fournisseurs.component';
import { AchatsComponent } from './pages/achats/achats.component';
import { VentesComponent } from './pages/ventes/ventes.component';
import { StatistiquesComponent } from './pages/statistiques/statistiques.component';
import { StockComponent } from './pages/stock/stock.component';
import { MatIconModule } from '@angular/material/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStore, faTachometerAlt, faTruck, faShoppingCart, faCashRegister, faChartBar, faBoxes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import FontAwesomeModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockePageComponent } from './stocke-page/stocke-page.component';
import { PageFournisseurComponent } from './page-fournisseur/page-fournisseur.component';
import { PageVenteComponent } from './page-vente/page-vente.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PageAchatComponent } from './page-achat/page-achat.component';
import { HeadbarComponent } from './headbar/headbar.component';
import { PageStatistiqueComponent } from './page-statistique/page-statistique.component';

library.add(faStore, faTachometerAlt, faTruck, faShoppingCart, faCashRegister, faChartBar, faBoxes, faSignOutAlt);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    FournisseursComponent,
    AchatsComponent,
    VentesComponent,
    StatistiquesComponent,
    StockComponent,
    LoginComponent,
    MainLayoutComponent,
    StockePageComponent,
    PageFournisseurComponent,
    PageVenteComponent,
  
    PageAchatComponent,
       HeadbarComponent,
       PageStatistiqueComponent
  ],
  imports: [MatIconModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule, 
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    RouterModule.forRoot([ // Correction : ajout de RouterModule
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'fournisseurs', component: FournisseursComponent },
      { path: 'achats', component: AchatsComponent },
      { path: 'ventes', component: VentesComponent },
      { path: 'statistiques', component: StatistiquesComponent },
      { path: 'stock', component: StockComponent }
    ]),
   // Ajout de SweetAlert2
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }