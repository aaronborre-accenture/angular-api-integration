import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from 'src/app/features/users/user-details/user-details.component';
import { CardComponent } from 'src/app/features/users/users-list/card/card.component';
import { UsersListComponent } from 'src/app/features/users/users-list/users-list.component';
import { UsersComponent } from 'src/app/features/users/users.component';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { ToAsteriskPipe } from 'src/app/pipes/toAsterisk.pipe';
import { AuthModule } from '../auth/auth.module';
import { UsersRoutingModule } from './users.routes.module';



@NgModule({
    declarations: [
        UsersComponent,
        UserDetailsComponent,
        UsersListComponent,
        ToAsteriskPipe,
        CardComponent,
        CapitalizePipe,
    ],
    exports: [HttpClientModule, ToAsteriskPipe, CapitalizePipe
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        HttpClientModule,
        AuthModule
    ]
})
export class UsersModule { }
