import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/authguard';
import { SomenteAdminComponent } from './somente-admin/somente-admin.component';
import { HasRoleGuard } from './shared/has-role-guard';
import { MudarSenhaComponent } from './mudar-senha/mudar-senha.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'admin', component:SomenteAdminComponent, canActivate:[AuthGuard, HasRoleGuard], data: {role:'admin'}},
  {path:'mudar-senha', component:MudarSenhaComponent, canActivate:[AuthGuard]},
  {path:'cadastrar-usuario', component:CadastrarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
