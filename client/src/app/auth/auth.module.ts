import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxOtpInputModule } from "ngx-otp-input";
import { OtpComponent } from './OTP/otp.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { InitComunityComponent } from './init-comunity/init-comunity.component';

@NgModule({
  declarations: [AuthComponent,OtpComponent, ForgotComponent, ResetComponent, InitComunityComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxOtpInputModule
  ], providers: []
})
export class AuthModule { }
