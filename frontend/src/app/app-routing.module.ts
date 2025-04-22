import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { StockePageComponent } from './stocke-page/stocke-page.component';
import { PageFournisseurComponent } from './page-fournisseur/page-fournisseur.component';
import { PageVenteComponent } from './page-vente/page-vente.component';
import { PageAchatComponent } from './page-achat/page-achat.component';
  import {StatistiquesComponent} from './pages/statistiques/statistiques.component';
import { PageStatistiqueComponent } from './page-statistique/page-statistique.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stocke-page', component: StockePageComponent },
  { path: 'fournisseur-page', component: PageFournisseurComponent },
  { path: 'vente-page', component:   PageVenteComponent },
  { path: 'achat-page', component: PageAchatComponent },
  {path:'statistique', component: PageStatistiqueComponent},
   {
    path: '',
    
    component: MainLayoutComponent, // Affiche header, sidebar et contenu
    canActivate: [AuthGuard], // Protège les routes après login
    children: [
      { path: 'dashboard', component: DashboardComponent } 
      // Ajoutez d'autres routes ici si nécessaire
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}