import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LibraryComponent } from './components/library/library.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  {path: "", redirectTo: "admin", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "library", component: LibraryComponent},
  {
    path: "admin", 
    canActivate: [AdminGuard], 
    loadChildren: ()=>import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {path: "**", redirectTo: 'admin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
