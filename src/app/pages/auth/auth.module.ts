import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { LoginComponent } from 'src/app/features/auth/login/login.component';
import { RegisterComponent } from 'src/app/features/auth/register/register.component';
import { AuthRoutingModule } from './auth.routes.module';



@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, RegisterComponent]
})
export class AuthModule { }
