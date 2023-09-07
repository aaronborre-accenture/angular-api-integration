import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { AuthenticatedGuard } from 'src/app/authenticated.guard';
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { LoginComponent } from 'src/app/features/auth/login/login.component';
import { RegisterComponent } from 'src/app/features/auth/register/register.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [AuthenticatedGuard]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AuthGuard]
            }
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AuthRoutingModule { }
