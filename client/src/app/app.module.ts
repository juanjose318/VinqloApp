import { AuthModule } from './auth/auth.module';
import { CommonService } from './core/services/common.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule, UserService } from './core';
import { LayoutModule } from './layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { APP_INITIALIZER } from '@angular/core';
import { map } from 'rxjs/operators';
import { ClipboardModule } from 'ngx-clipboard';

import { TagifyModule } from 'ngx-tagify';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule, CoreModule, NgbModule,AuthModule, NgxPermissionsModule.forRoot(),TagifyModule.forRoot()],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (
        us: UserService,
        cs: CommonService,
        ps: NgxPermissionsService
      ) =>
        function () {
          cs.getCommon();
          return us.populate().pipe(
            map((user) => {
              if (user) {
                ps.loadPermissions([user.role.toString()]);
              }
            })
          );
        },
      deps: [UserService, CommonService, NgxPermissionsService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
