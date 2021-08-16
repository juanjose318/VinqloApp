import { InitComunityComponent } from './init-comunity/init-comunity.component';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './OTP/otp.component';
import { ResetComponent } from './reset/reset.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NoAuthGuard } from '../core';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'otp/:email/:type', component: OtpComponent
  },
  {
    path: 'forgot', component: ForgotComponent, canActivate: [NoAuthGuard]
  },
  {
    path: 'initial-community', component: InitComunityComponent
  },
  {
    path: 'reset', component: ResetComponent, canActivate: [NoAuthGuard]
  },
  {
    path: '' , redirectTo: '/auth/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
