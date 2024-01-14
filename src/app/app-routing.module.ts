import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth-guard/auth.guard';
import { LoginGuard } from './core/guard/login-guard/login.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule),
      }
    ]
  },
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      {
        path: 'customer',
        component: CustomerDashboardComponent
      },
      {
        path: 'admin',
        component: AdminDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
