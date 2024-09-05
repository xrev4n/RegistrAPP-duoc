import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PasswordrecoveryPage } from '../passwordrecovery/passwordrecovery.page';
import { RegisterPage } from '../register/register.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'password-recovery',
    component: PasswordrecoveryPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
