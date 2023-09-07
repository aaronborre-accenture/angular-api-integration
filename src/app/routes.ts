
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes=[
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
        pathMatch: 'prefix',
    },
    {
        path: '',
        loadChildren: () => import('./pages/users/users.module').then((m)=> m.UsersModule),
        pathMatch: 'prefix',
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
