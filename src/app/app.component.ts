import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'angular-api-integration';
  constructor(private router: Router){

  }
  goto(loc: string){
    this.router.navigate([loc])
  }
}
