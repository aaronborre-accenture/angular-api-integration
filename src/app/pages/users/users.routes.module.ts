import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from 'src/app/features/users/user-details/user-details.component';
import { UsersListComponent } from 'src/app/features/users/users-list/users-list.component';
import { UsersComponent } from 'src/app/features/users/users.component';

export const usersRoutes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        children: [
            {
                path: 'list',
                component: UsersListComponent
            },
            {
                path: 'list/:id',
                component: UserDetailsComponent,
            }
        ]
    },
    
]

@NgModule({
    imports: [RouterModule.forChild(usersRoutes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
