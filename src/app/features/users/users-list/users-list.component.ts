import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {

  private _userSubscription!: Subscription
  private _userListSubscription!: Subscription
  private _userDeleteSubscription!: Subscription
  userList: IUser[] = []

  constructor(private userService: UserService, private router: Router){
    
  }
  
  ngOnInit(): void {
    this.getUsersList();
    
  }

  getUsersList(){
    this._userSubscription = this.userService.list().subscribe()
    this._userListSubscription = this.userService.userList$.subscribe((res)=>{
      this.userList = res
      console.log(res);
    })
  }

  onViewUser(id:string){
    console.log(id);
    this.router.navigate(['/users/list', id])
  }

  onDeleteUser(id: string): void {
    this._userDeleteSubscription = this.userService.delete(id).subscribe()
  }

  trackByFn(index: number, user: IUser): string | undefined { return user.id; }
  
  ngOnDestroy(): void {
    this._userSubscription.unsubscribe()
    this._userListSubscription.unsubscribe()
  }

}
