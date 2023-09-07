import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.services';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SpecialRouteInterceptor } from './http.interceptor';
import { AuthModule } from './pages/auth/auth.module';
import { UsersModule } from './pages/users/users.module';
import { AppRoutingModule } from './routes';
import { SampleHttpInterceptor } from './sample-intercept.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UsersModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: SpecialRouteInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SampleHttpInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule{
  constructor(private authService: AuthService){
    this.replaceToken()
  }

  replaceToken(){
    let token = localStorage.getItem('token') === '' || localStorage.getItem('token') === undefined? '' : localStorage.getItem('token')
    this.authService.token$.next(token!)
    token === '' ? this.authService.isAuthenticated$.next(true) : this.authService.isAuthenticated$.next(false)
  }
}
