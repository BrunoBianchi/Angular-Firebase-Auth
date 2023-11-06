import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuardsGuard } from 'src/app/shared/guards/auth-guards.guard';

const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[authGuardsGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
