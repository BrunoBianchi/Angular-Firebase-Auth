import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { logoutGuardGuard } from './shared/guards/logout-guard.guard';
import { authGuardsGuard } from './shared/guards/auth-guards.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  {path:'',component:HomeComponentComponent,pathMatch:'full'},
  {path:'sign-in',component:SignInComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'logout',pathMatch:'full',component:HomeComponentComponent,canActivate:[logoutGuardGuard]},
  {path:'dashboard',loadChildren:()=>import('./components/dashboard/dashboard.module').then(m=>m.AppRoutingModule)},
  {path:'verify-email',component:VerifyEmailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
