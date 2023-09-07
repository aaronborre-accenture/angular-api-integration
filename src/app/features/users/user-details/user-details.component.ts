import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private _userSubscription!: Subscription
  private _userDetailsSubscription!: Subscription
  private _routeSubscription!: Subscription
  private _userDeleteSubscription!: Subscription
  id!: string
  user!: IUser
  isEdit: boolean = false
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    this.getRouteParams();
  }
  onDelete(id: string){
    this._userDeleteSubscription = this.userService.delete(id).subscribe((res)=>{
      res? this.router.navigate(['/users/list']) : alert('Delete user unsuccessful')
    })
  }
  onEdit(){
    this.isEdit = !this.isEdit
  }

  getRouteParams(){
    this._routeSubscription = this.route.paramMap
      .pipe(map(params => params.get('id')))
      .subscribe(id=> {
        this.id = id!
        this.getUserDetails(this.id)
      });
  }
  
  getUserDetails(id: string) {
    this._userSubscription = this.userService.view(id).subscribe()
    this._userDetailsSubscription = this.userService.userDetails$.subscribe((res)=>{
      this.user = res
    })
  }
  
  ngOnDestroy(): void {
    
    this._routeSubscription.unsubscribe()
  }

}
