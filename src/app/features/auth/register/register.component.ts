import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() isEdit: boolean = false
  registerForm!: FormGroup;
  emptyUser:IUser ={  
    id: '',
    fullName: '',
    userName: '',
    contactNo: '',
    photo: '',
    createdBy: '',
    dateCreated: '',
    email: '',
    description: ''
  }
  user: IUser = this.emptyUser

  constructor(private userServices: UserService, private router: Router){
    
  }
  initiziateForm(){
    this.userServices.userDetails$.subscribe(res=>{
      this.user = this.isEdit ? res : this.emptyUser
      this.registerForm = new FormGroup({
        fullName: new FormControl(this.user.fullName, [Validators.required]),
        userName: new FormControl(this.user.userName, [Validators.required, Validators.minLength(6)]),
        contactNo: new FormControl(this.user.contactNo, [Validators.required]),
        photo: new FormControl(''),
        createdBy: new FormControl(''),
        dateCreated: new FormControl(''),
        email: new FormControl(this.user.email, [Validators.required]),
        description: new FormControl(this.user.description)
      })
    })
    
  }
  ngOnInit(): void {
    this.initiziateForm()
  }

  onRegister(){
    this.isEdit ? this.userServices.update({id: this.user.id, ...this.registerForm.value}).subscribe(
      (res)=>{
        res && this.router.navigate(['/users/list'])
      }
    ) :
    this.userServices.register(this.registerForm.value).subscribe(
      (res)=>{
        res && this.registerForm.reset()
      }
    )
  }
}
